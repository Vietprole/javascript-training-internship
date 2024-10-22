import { v4 as uuidv4 } from 'uuid';
import Customer from '../models/customer';
import { postData, putData } from '../utils/http-request';
import { API_BASE_URL } from '../constants/api';
import { addNewTableRow, editCurrentCustomerRow } from './dashboard';
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
    // Send a POST request to the API
    await postData(newCustomer.toJSON());
    // Add new customer row to top of the table
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
    await putData(updatedCustomer.toJSON(), `${API_BASE_URL}/${id}`);
    editCurrentCustomerRow(updatedCustomer);
  }
  closeModal(customerModal);
}

// The "Field is required" error message
function createErrorMessage() {
  const errorMessage = document.createElement('div');
  errorMessage.classList.add('error-message');
  return errorMessage;
}

// Symbol: $, €, £, etc.
function createSymbol() {
  const symbol = document.createElement('span');
  symbol.classList.add('symbol');
  symbol.textContent = DEFAULT_SYMBOL;
  return symbol;
}

// Input wrapper for layout and styles
function createInputWrapper() {
  const inputWrapper = document.createElement('div');
  inputWrapper.classList.add('input-wrapper');
  return inputWrapper;
}

function createNameField() {
  const nameField = document.createElement('div');
  nameField.classList.add('name-field');
  // Create the label for the name input
  const nameLabel = document.createElement('label');
  nameLabel.setAttribute('for', 'name-input');
  nameLabel.classList.add('label');
  nameLabel.textContent = 'Name';
  // Create the input wrapper
  const inputWrapper = createInputWrapper();
  const nameInput = document.createElement('input');
  nameInput.setAttribute('type', 'text');
  nameInput.setAttribute('id', 'name-input');
  nameInput.setAttribute('required', 'true');
  // Setup listeners for the name input
  setupInputListeners(nameInput, true);
  inputWrapper.appendChild(nameInput);
  // Add error message
  const errorMessage = createErrorMessage();
  nameField.append(nameLabel, inputWrapper, errorMessage);
  return nameField;
}

function createStatusField() {
  const statusField = document.createElement('div');
  statusField.classList.add('status-field');
  // Create the label for the status input
  const statusLabel = document.createElement('label');
  statusLabel.setAttribute('for', 'status-input');
  statusLabel.classList.add('label');
  statusLabel.textContent = 'Status';
  // Select status between Open, Paid, Inactive, Due
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
  // Append options to the select element
  statusInput.append(openOption, paidOption, inactiveOption, dueOption);
  statusField.append(statusLabel, statusInput);
  return statusField;
}

// Financial value input field: Rate, Balance, Deposit
function createFinancialField(valueType) {
  const financialField = document.createElement('div');
  financialField.classList.add(`${valueType}-field`);
  const label = document.createElement('label');
  label.setAttribute('for', `${valueType}-input`);
  label.classList.add('label');
  label.textContent = capitalizeFirstLetter(valueType);
  const inputWrapper = createInputWrapper();
  const symbol = createSymbol();
  const input = document.createElement('input');
  input.setAttribute('type', 'text');
  input.setAttribute('id', `${valueType}-input`);
  input.setAttribute('required', 'true');
  // Setup listeners for the financial input
  setupInputListeners(input);
  inputWrapper.append(symbol, input);
  const errorMessage = createErrorMessage();
  financialField.append(label, inputWrapper, errorMessage);
  return financialField;
}

function createDescriptionField() {
  const descriptionField = document.createElement('div');
  descriptionField.classList.add('description-field');
  // Create the label for the description input
  const descriptionLabel = document.createElement('label');
  descriptionLabel.setAttribute('for', 'description-input');
  descriptionLabel.classList.add('label');
  descriptionLabel.textContent = 'Description';
  const descriptionInput = document.createElement('textarea');
  descriptionInput.setAttribute('id', 'description-input');
  descriptionField.append(descriptionLabel, descriptionInput);
  return descriptionField;
}

// Create confirm and close buttons
function createButtonGroup() {
  const buttonGroup = document.createElement('div');
  buttonGroup.classList.add('button-group');
  // Create the confirm button
  const confirmButton = document.createElement('button');
  confirmButton.classList.add('button-primary', 'confirm-button');
  confirmButton.setAttribute('disabled', 'true');
  confirmButton.textContent = state.isAddMode ? 'Create' : 'Save';
  // Create the close button
  const closeButton = document.createElement('button');
  closeButton.classList.add('button-secondary', 'close-button');
  closeButton.textContent = 'Close';
  buttonGroup.append(confirmButton, closeButton);
  return buttonGroup;
}

function createModalForm() {
  const form = document.createElement('form');
  form.classList.add('modal-form');
  // Create the fields for the form
  const nameField = createNameField();
  const statusField = createStatusField();
  const rateField = createFinancialField('rate');
  const balanceField = createFinancialField('balance');
  const depositField = createFinancialField('deposit');
  const descriptionField = createDescriptionField();
  form.append(nameField, statusField, rateField, balanceField, depositField, descriptionField);
  return form;
}

function createCustomerModal(isAddMode) {
  const customerModal = document.querySelector('.customer-modal');
  // Create the heading for the modal
  const heading = document.createElement('h2');
  heading.textContent = isAddMode ? 'Add Customer' : 'Edit Customer';
  const horizontalRule = document.createElement('hr');

  // Create the form for the modal
  const form = createModalForm();

  // Create the button group for the modal
  const buttonGroup = createButtonGroup();

  customerModal.append(heading, horizontalRule, form, buttonGroup);

  // Add event listeners for the confirm button
  const confirmButton = document.querySelector('.confirm-button');
  confirmButton.addEventListener('click', handleAddOrEditCustomer);

  // Add event listeners for the close button
  const closeCustomerModalButton = document.querySelector('.customer-modal .close-button');
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
  const symbols = document.querySelectorAll('.symbol');

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
