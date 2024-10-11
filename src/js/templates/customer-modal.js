import { v4 as uuidv4 } from 'uuid';
import Customer from '../models/customer';
import { Post, Put } from '../utils/http-request';
import { API_BASE_URL } from '../constants/api';
import { addNewTableRow, editCurrentCustomerRow } from './dashboard';
import {
  hasNumbers,
  enforceMaxLength,
  isValid,
  showErrorIfEmpty,
  sanitizeInput,
  checkFormValidity,
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

function addEventListenersForModalButtons() {
  const customerModal = document.querySelector('.customer-modal');
  const closeCustomerModalButton = document.querySelector('.customer-modal .close-button');
  const confirmButton = document.querySelector('.confirm-button');

  const nameInput = document.getElementById('name-input');
  const statusInput = document.getElementById('status-input');
  const rateInput = document.getElementById('rate-input');
  const balanceInput = document.getElementById('balance-input');
  const depositInput = document.getElementById('deposit-input');
  const descriptionInput = document.getElementById('description-input');

  closeCustomerModalButton.addEventListener('click', () => {
    closeModal(customerModal);
  });

  // Store previous values for inputs in an object instead of separated variables
  const previousValues = {
    name: '',
    rate: '',
    balance: '',
    deposit: '',
  };

  const inputMap = {
    'name-input': 'name',
    'rate-input': 'rate',
    'balance-input': 'balance',
    'deposit-input': 'deposit',
  };

  function setPreviousValue() {
    const key = inputMap[this.id];
    if (key) previousValues[key] = this.value;
  }

  const validators = {
    name: (value) => !hasNumbers(value),
    rate: (value) => isValid(value),
    balance: (value) => isValid(value, true), // allow negative numbers
    deposit: (value) => isValid(value),
  };

  // Validate the input and revert to the previous value if the new value is invalid
  function validateAndRevertInput() {
    const key = inputMap[this.id];
    if (this.value && !validators[key](this.value)) {
      this.value = previousValues[key];
    }
  }

  // maxLength : boolean
  function setupInputListeners(inputElement, maxLength) {
    if (maxLength) inputElement.addEventListener('input', enforceMaxLength);
    inputElement.addEventListener('blur', showErrorIfEmpty);
    inputElement.addEventListener('keydown', setPreviousValue);
    inputElement.addEventListener('input', validateAndRevertInput);
    inputElement.addEventListener('input', checkFormValidity);
  }

  // Setup listeners for each input field
  setupInputListeners(nameInput, true);
  setupInputListeners(rateInput);
  setupInputListeners(balanceInput);
  setupInputListeners(depositInput);

  // Handle the customer modal form submission
  async function handleAddOrEditCustomer(event) {
    const { target } = event;
    target.disabled = true;
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

    if (state.isAddMode) {
      const id = uuidv4();
      // Create a new Customer instance
      const newCustomer = new Customer(id, name, status, rate, balance, deposit, description);
      // Send a POST request to the API
      await Post(newCustomer.toJSON());
      addNewTableRow(newCustomer);
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
      // Send a PUT request to the API
      await Put(updatedCustomer.toJSON(), `${API_BASE_URL}/${id}`);
      editCurrentCustomerRow(updatedCustomer);
    }
    closeModal(customerModal);
  }
  confirmButton.addEventListener('click', handleAddOrEditCustomer);
}

function createCustomerModal(isAddMode) {
  const customerModal = document.querySelector('.customer-modal');

  const heading = document.createElement('h2');
  heading.textContent = isAddMode ? 'Add Customer' : 'Edit Customer';
  const horizontalRule = document.createElement('hr');
  const form = document.createElement('form');
  form.classList.add('modal-form');

  const nameField = document.createElement('div');
  nameField.classList.add('name-field');
  const nameLabel = document.createElement('label');
  nameLabel.setAttribute('for', 'name-input');
  nameLabel.classList.add('label');
  nameLabel.textContent = 'Name';
  const inputWrapper = document.createElement('div');
  inputWrapper.classList.add('input-wrapper');
  const nameInput = document.createElement('input');
  nameInput.setAttribute('type', 'text');
  nameInput.setAttribute('id', 'name-input');
  nameInput.setAttribute('required', 'true');
  inputWrapper.appendChild(nameInput);
  // Reusable error message
  const errorMessage = document.createElement('div');
  errorMessage.classList.add('error-message');
  nameField.append(nameLabel, inputWrapper, errorMessage);

  const statusField = document.createElement('div');
  statusField.classList.add('status-field');
  const statusLabel = document.createElement('label');
  statusLabel.setAttribute('for', 'status-input');
  statusLabel.classList.add('label');
  statusLabel.textContent = 'Status';
  const statusInput = document.createElement('select');
  statusInput.setAttribute('id', 'status-input');
  const openOption = document.createElement('option');
  openOption.setAttribute('value', Status.OPEN);
  openOption.textContent = Status.OPEN;
  const paidOption = document.createElement('option');
  paidOption.setAttribute('value', Status.PAID);
  paidOption.textContent = Status.PAID;
  const inactiveOption = document.createElement('option');
  inactiveOption.setAttribute('value', Status.INACTIVE);
  inactiveOption.textContent = Status.INACTIVE;
  const dueOption = document.createElement('option');
  dueOption.setAttribute('value', Status.DUE);
  dueOption.textContent = Status.DUE;
  statusInput.append(openOption, paidOption, inactiveOption, dueOption);
  statusField.append(statusLabel, statusInput);

  // Reusable symbol
  const symbol = document.createElement('span');
  symbol.classList.add('symbol');
  symbol.textContent = DEFAULT_SYMBOL;

  const rateField = document.createElement('div');
  rateField.classList.add('rate-field');
  const rateLabel = document.createElement('label');
  rateLabel.setAttribute('for', 'rate-input');
  rateLabel.classList.add('label');
  rateLabel.textContent = 'Rate';
  const rateInputWrapper = inputWrapper.cloneNode(false);
  const rateSymbol = symbol.cloneNode(true);
  const rateInput = document.createElement('input');
  rateInput.setAttribute('type', 'text');
  rateInput.setAttribute('id', 'rate-input');
  rateInput.setAttribute('required', 'true');
  rateInputWrapper.append(rateSymbol, rateInput);
  const rateErrorMessage = errorMessage.cloneNode(false);
  rateField.append(rateLabel, rateInputWrapper, rateErrorMessage);

  const balanceField = document.createElement('div');
  balanceField.classList.add('balance-field');
  const balanceLabel = document.createElement('label');
  balanceLabel.setAttribute('for', 'balance-input');
  balanceLabel.classList.add('label');
  balanceLabel.textContent = 'Balance';
  const balanceInputWrapper = inputWrapper.cloneNode(false);
  const balanceSymbol = symbol.cloneNode(true);
  const balanceInput = document.createElement('input');
  balanceInput.setAttribute('type', 'text');
  balanceInput.setAttribute('id', 'balance-input');
  balanceInput.setAttribute('required', 'true');
  balanceInputWrapper.append(balanceSymbol, balanceInput);
  const balanceErrorMessage = errorMessage.cloneNode(false);
  balanceField.append(balanceLabel, balanceInputWrapper, balanceErrorMessage);

  const depositField = document.createElement('div');
  depositField.classList.add('deposit-field');
  const depositLabel = document.createElement('label');
  depositLabel.setAttribute('for', 'deposit-input');
  depositLabel.classList.add('label');
  depositLabel.textContent = 'Deposit';
  const depositInputWrapper = inputWrapper.cloneNode(false);
  const depositSymbol = symbol.cloneNode(true);
  const depositInput = document.createElement('input');
  depositInput.setAttribute('type', 'text');
  depositInput.setAttribute('id', 'deposit-input');
  depositInput.setAttribute('required', 'true');
  depositInputWrapper.append(depositSymbol, depositInput);
  const depositErrorMessage = errorMessage.cloneNode(false);
  depositField.append(depositLabel, depositInputWrapper, depositErrorMessage);

  const descriptionField = document.createElement('div');
  descriptionField.classList.add('description-field');
  const descriptionLabel = document.createElement('label');
  descriptionLabel.setAttribute('for', 'description-input');
  descriptionLabel.classList.add('label');
  descriptionLabel.textContent = 'Description';
  const descriptionInput = document.createElement('textarea');
  descriptionInput.setAttribute('id', 'description-input');
  descriptionField.append(descriptionLabel, descriptionInput);

  const buttonGroup = document.createElement('div');
  buttonGroup.classList.add('button-group');
  const confirmButton = document.createElement('button');
  confirmButton.classList.add('button-primary', 'confirm-button');
  confirmButton.setAttribute('disabled', 'true');
  confirmButton.textContent = isAddMode ? 'Create' : 'Save';
  const closeButton = document.createElement('button');
  closeButton.classList.add('button-secondary', 'close-button');
  closeButton.textContent = 'Close';
  buttonGroup.append(confirmButton, closeButton);

  form.append(nameField, statusField, rateField, balanceField, depositField, descriptionField);
  customerModal.append(heading, horizontalRule, form, buttonGroup);

  addEventListenersForModalButtons();
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
  const symbols = document.querySelectorAll('.symbol');

  const customer = state.currentCustomer;
  nameInput.value = customer.name;
  statusInput.value = customer.status;
  rateInput.value = customer.rate;
  balanceInput.value = customer.balance;
  depositInput.value = customer.deposit;
  descriptionInput.value = customer.description;
  symbols.forEach((symbol) => {
    symbol.textContent = customer.symbol;
  });

  // Check the form validity when the modal is opened
  checkFormValidity();
  openModal(customerModal);
}

export { createCustomerModal, fillEditModal, addEventListenersForModalButtons };
