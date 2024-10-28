import { v4 as uuidv4 } from 'uuid';
import Customer from '../models/customer';
import { postData, putData } from '../utils/http-request';
import { API_BASE_URL } from '../constants/api';
import { addNewTableRow, editCurrentCustomerRow } from './dashboard';
import { showLoader, hideLoader } from '../utils/loader';
import {
  hasNumbers,
  enforceMaxLength,
  isFinancialValueValid,
  showErrorIfFieldIsEmpty,
  sanitizeInput,
  checkFormValidity,
  capitalizeFirstLetter,
} from '../utils/helpers';

import { openModal, closeModal } from '../utils/modal';

import state from '../constants/state';
import { DEFAULT_SYMBOL } from '../constants/currency';

const Status = {
  OPEN: 'Open',
  PAID: 'Paid',
  INACTIVE: 'Inactive',
  DUE: 'Due',
};

// Store previous values for inputs in an object instead of separated variables
const previousValues = {
  name: '',
  rate: '',
  balance: '',
  deposit: '',
};

// Map the input object with the corresponding key in the previousValues object
const inputMap = {
  'name-input': 'name',
  'rate-input': 'rate',
  'balance-input': 'balance',
  'deposit-input': 'deposit',
};

// Save the previous value of the input fields into the previousValues object
function setPreviousValue() {
  const key = inputMap[this.id];
  if (key) previousValues[key] = this.value;
}

// Choose the appropriate validator based on the input field
const validators = {
  name: (value) => !hasNumbers(value),
  rate: (value) => isFinancialValueValid(value),
  balance: (value) => isFinancialValueValid(value, true), // allow negative numbers
  deposit: (value) => isFinancialValueValid(value),
};

// Validate the input and revert to the previous value if the new value is invalid
function validateAndRevertInput() {
  const key = inputMap[this.id];
  if (this.value && !validators[key](this.value)) {
    this.value = previousValues[key];
  }
}

// Setup input listeners for each input field
function setupInputListeners(inputElement, hasMaxLength) {
  if (hasMaxLength) inputElement.addEventListener('input', enforceMaxLength);
  inputElement.addEventListener('blur', showErrorIfFieldIsEmpty);
  inputElement.addEventListener('keydown', setPreviousValue);
  inputElement.addEventListener('input', validateAndRevertInput);
  inputElement.addEventListener('input', checkFormValidity);
}

// Handle the customer modal form submission
async function handleAddOrEditCustomer(event) {
  // Disable the confirm button to prevent multiple submissions
  const { target } = event;
  target.disabled = true;

  // Get the customer modal
  const customerModal = document.querySelector('.customer-modal');

  // Get the customer modal inputs
  const nameInput = document.getElementById('name-input');
  const statusInput = document.getElementById('status-input');
  const rateInput = document.getElementById('rate-input');
  const balanceInput = document.getElementById('balance-input');
  const depositInput = document.getElementById('deposit-input');
  const descriptionInput = document.getElementById('description-input');

  // Get value of each input field
  const name = nameInput.value;
  const status = statusInput.value;
  const description = descriptionInput.value;
  let rate = rateInput.value;
  let balance = balanceInput.value;
  let deposit = depositInput.value;
  // Remove any trailing decimal points or negative signs
  rate = sanitizeInput(rate);
  balance = sanitizeInput(balance);
  deposit = sanitizeInput(deposit);

  // Add new customer if in add mode, otherwise edit the current customer
  if (state.isAddMode) {
    const id = uuidv4();
    // Create a new Customer instance
    const newCustomer = new Customer(id, name, status, rate, balance, deposit, description);
    // Close the modal
    closeModal(customerModal);
    // Show the loader
    showLoader();
    // Send a POST request to the API
    await postData(newCustomer.toJSON());
    // Add new customer row to top of the table
    addNewTableRow(newCustomer);
    // Hide the loader
    hideLoader();
  } else {
    const { id } = state.currentCustomer;
    const { currency } = state.currentCustomer;
    const { symbol } = state.currentCustomer;
    // Create an updated Customer instance
    const updatedCustomer = new Customer(
      id,
      name,
      status,
      rate,
      balance,
      deposit,
      description,
      currency,
      symbol
    );
    // Close the modal
    closeModal(customerModal);
    // Show the loader
    showLoader();
    // Send a PUT request to the API
    await putData(updatedCustomer.toJSON(), `${API_BASE_URL}/${id}`);
    editCurrentCustomerRow(updatedCustomer);
    // Hide the loader
    hideLoader();
  }
}

function createCustomerModal(isAddMode) {
  const customerModal = document.querySelector('.customer-modal');
  customerModal.innerHTML = `
    <h2>${isAddMode ? 'Add Customer' : 'Edit Customer'}</h2>
    <hr>
    <form class="modal-form">
      <div class="name-field">
        <label for="name-input" class="label">Name</label>
        <div class="input-wrapper">
          <input type="text" id="name-input" required>
        </div>
        <div class="error-message"></div>
      </div>
      <div class="status-field">
        <label for="status-input" class="label">Status</label>
        <select id="status-input">
          <option value="${Status.OPEN}">${Status.OPEN}</option>
          <option value="${Status.PAID}">${Status.PAID}</option>
          <option value="${Status.INACTIVE}">${Status.INACTIVE}</option>
          <option value="${Status.DUE}">${Status.DUE}</option>
        </select>
      </div>
      <div class="rate-field">
        <label for="rate-input" class="label">Rate</label>
        <div class="input-wrapper">
          <span class="symbol">${DEFAULT_SYMBOL}</span>
          <input type="text" id="rate-input" required>
        </div>
        <div class="error-message"></div>
      </div>
      <div class="balance-field">
        <label for="balance-input" class="label">Balance</label>
        <div class="input-wrapper">
          <span class="symbol">${DEFAULT_SYMBOL}</span>
          <input type="text" id="balance-input" required>
        </div>
        <div class="error-message"></div>
      </div>
      <div class="deposit-field">
        <label for="deposit-input" class="label">Deposit</label>
        <div class="input-wrapper">
          <span class="symbol">${DEFAULT_SYMBOL}</span>
          <input type="text" id="deposit-input" required>
        </div>
        <div class="error-message"></div>
      </div>
      <div class="description-field">
        <label for="description-input" class="label">Description</label>
        <textarea id="description-input"></textarea>
      </div>
    </form>
    <div class="button-group">
      <button class="button-primary confirm-button" disabled>${isAddMode ? 'Create' : 'Save'}</button>
      <button class="button-secondary close-button">Close</button>
    </div>
  `;

  // Setup input listeners
  setupInputListeners(document.getElementById('name-input'), true);
  setupInputListeners(document.getElementById('rate-input'));
  setupInputListeners(document.getElementById('balance-input'));
  setupInputListeners(document.getElementById('deposit-input'));

  // Add event listeners for the confirm button
  const confirmButton = customerModal.querySelector('.confirm-button');
  confirmButton.addEventListener('click', handleAddOrEditCustomer);

  // Add event listeners for the close button
  const closeCustomerModalButton = customerModal.querySelector('.close-button');
  closeCustomerModalButton.addEventListener('click', () => {
    closeModal(customerModal);
  });
}

// Fill the edit form with the current customer's data
async function fillEditModal() {
  state.isAddMode = false;
  createCustomerModal(state.isAddMode);
  const customerModal = document.querySelector('.customer-modal');

  const nameInput = document.getElementById('name-input');
  const statusInput = document.getElementById('status-input');
  const rateInput = document.getElementById('rate-input');
  const balanceInput = document.getElementById('balance-input');
  const depositInput = document.getElementById('deposit-input');
  const descriptionInput = document.getElementById('description-input');
  const symbols = customerModal.querySelectorAll('.symbol');

  const customer = state.currentCustomer;
  nameInput.value = customer.name;
  statusInput.value = customer.status;
  rateInput.value = customer.rate;
  balanceInput.value = customer.balance;
  depositInput.value = customer.deposit;
  descriptionInput.value = customer.description;
  symbols.forEach((symbol) => {
    const temp = symbol;
    temp.textContent = customer.symbol;
  });

  // Check the form validity when the modal is opened
  checkFormValidity();
  openModal(customerModal);
}

export { createCustomerModal, fillEditModal };
