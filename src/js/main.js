import { v4 as uuidv4 } from 'uuid';
import { API_BASE_URL, HTTP_METHODS } from './constants/api';
import httpRequest from './utils/http-request';
import menuIcon from '../assets/icons/menu-icon.svg';

class Customer {
  constructor(id, name, status, rate, balance, deposit, description) {
    this.id = id;
    this.name = name;
    this.status = status;
    this.rate = rate;
    this.balance = balance;
    this.deposit = deposit;
    this.description = description;
  }

  toJSON() {
    return JSON.stringify({
      id: this.id,
      name: this.name,
      status: this.status,
      rate: this.rate,
      balance: this.balance,
      deposit: this.deposit,
      description: this.description,
    });
  }
}

export default Customer;

// const newUuid = uuidv4();
// const newCustomer = new Customer(
//   newUuid,
//   'John Boe',
//   'Due',
//   0.05,
//   2000,
//   600,
//   'A new test customer'
// );
// httpRequest(HTTP_METHODS.POST, newCustomer.toJSON());

// const putUrl = `${API_BASE_URL}/8434960a-b06b-4dc9-98b9-d6306de7cdad`;
// const updatedCustomer = new Customer(
//   newUuid,
//   'John Doe',
//   'Open',
//   0.05,
//   2000,
//   600,
//   'An updated test customer'
// );

// httpRequest(HTTP_METHODS.PUT, updatedCustomer.toJSON(), putUrl);
// httpRequest(HTTP_METHODS.DELETE, null, `${API_BASE_URL}/5b4f0c09-6f57-4467-8cad-23c11a65afe1`);

//* Action menu functionality
const actionMenuButtons = document.querySelectorAll('.menu-button');
const actionMenu = document.querySelector('.action-menu');

actionMenuButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const { top, left } = button.getBoundingClientRect();
    actionMenu.style.top = `${top}px`;
    actionMenu.style.left = `${left - 100}px`;
    actionMenu.classList.add('open');
  });
});

window.addEventListener('click', (event) => {
  // Close the action menu if the user clicks outside of it
  // Check if action menu's buttons is not the target to prevent closing the menu when clicking on them
  if (!Array.from(actionMenuButtons).some((button) => button.contains(event.target))) {
    actionMenu.classList.remove('open');
  }
});

//* Modal functionality
const addButton = document.querySelector('.add-button');
const editButton = document.querySelector('.edit-button');
const viewButton = document.querySelector('.view-button');
const createButton = document.querySelector('.create-button');
// const saveButton = document.querySelector('.save-button');
const closeAddModalButton = document.querySelector('.add-customer-modal .close-button');
const closeEditModalButton = document.querySelector('.edit-customer-modal .close-button');
const closeViewModalButton = document.querySelector('.view-customer-modal .close-button');
const addCustomerModal = document.querySelector('.add-customer-modal');
const editCustomerModal = document.querySelector('.edit-customer-modal');
const viewCustomerModal = document.querySelector('.view-customer-modal');
const modalOverlay = document.querySelector('.modal-overlay');

//* Open and close modal functions
function openModal(modal) {
  const modalElement = modal;
  modalElement.classList.add('open'); // Show the modal
  modalOverlay.classList.add('open'); // Show the overlay
}

function closeModal(modal) {
  const modalElement = modal;
  modalElement.classList.remove('open'); // Hide the modal
  // Reset all input fields within the modal
  const inputs = modalElement.querySelectorAll('input');
  inputs.forEach((input) => {
    const temp = input;
    temp.value = '';
  });

  // Reset all select fields within the modal
  const selects = modalElement.querySelectorAll('select');
  selects.forEach((select) => {
    const temp = select;
    temp.selectedIndex = 0;
  });

  // Reset all textarea fields within the modal
  const textareas = modalElement.querySelectorAll('textarea');
  textareas.forEach((textarea) => {
    const temp = textarea;
    temp.value = '';
  });

  modalOverlay.classList.remove('open'); // Hide the overlay
}

//* Form validation
// For Add customer modal
const addNameInput = document.getElementById('add-name-input');
const addRateInput = document.getElementById('add-rate-input');
const addBalanceInput = document.getElementById('add-balance-input');
const addDepositInput = document.getElementById('add-deposit-input');

// Function to prevent numbers from being typed
function preventNumbers(event) {
  const { key } = event;
  const isNumber = /^[0-9]$/.test(key);
  if (isNumber) {
    event.preventDefault();
  }
}

// Function to enforce max length
function enforceMaxLength(event) {
  const input = event.target;
  if (input.value.length >= 50) {
    input.value = input.value.slice(0, 50);
    event.preventDefault();
  }
}

// Function to check if the rate, balance, deposit is valid
function isValid(input) {
  // Positive, max 7 digits, max 2 decimal places, allow trailing decimal point
  return /^\d{1,7}(\.\d{0,2})?$/.test(input);
}

function enforceValidFormat(event) {
  const { key } = event;
  const allowedKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'];

  // Get the current value of the input and the cursor position
  const input = event.target;
  const start = input.selectionStart;
  const end = input.selectionEnd;

  let newValue;

  if (key === 'Backspace') {
    // If Backspace is pressed, remove the character before the cursor
    if (start === end) {
      newValue = input.value.slice(0, start - 1) + input.value.slice(end);
    } else {
      // If there is a selection, remove the selected text
      newValue = input.value.slice(0, start) + input.value.slice(end);
    }

    // Prevent the user from deleting the decimal point if the input is longer than 7
    if (!newValue.includes('.') && newValue.length > 7) {
      event.preventDefault();
    }
  } else if (key === 'Delete') {
    // If Delete is pressed, remove the character after the cursor
    if (start === end) {
      newValue = input.value.slice(0, start) + input.value.slice(end + 1);
    } else {
      // If there is a selection, remove the selected text
      newValue = input.value.slice(0, start) + input.value.slice(end);
    }

    // Prevent the user from deleting the decimal point if the input is longer than 7
    if (!newValue.includes('.') && newValue.length > 7) {
      event.preventDefault();
    }
  } else {
    // Construct the new value by inserting the key at the cursor position
    newValue = input.value.slice(0, start) + key + input.value.slice(end);
  }

  console.log(newValue, isValid(newValue), allowedKeys.includes(key));
  if (!isValid(newValue) && !allowedKeys.includes(key)) {
    event.preventDefault();
  }
}

function removeTrailingDecimalPoint(value) {
  if (value.endsWith('.')) {
    return value.slice(0, -1);
  }
  return value;
}

// Function to check if all inputs are valid
function checkAddFormValidity() {
  const rate = addRateInput.value;
  const balance = addBalanceInput.value;
  const deposit = addDepositInput.value;
  removeTrailingDecimalPoint(rate);
  removeTrailingDecimalPoint(balance);
  removeTrailingDecimalPoint(deposit);
  const isFormValid =
    addNameInput.value && isValid(rate) && isValid(balance) && isValid(deposit.value);
  createButton.disabled = !isFormValid;
}

function showWarningIfEmpty(event) {
  const input = event.target;
  if (!input.value.trim()) {
    input.classList.add('warning');
  }
}

addNameInput.addEventListener('keydown', preventNumbers);
addNameInput.addEventListener('input', enforceMaxLength);
addNameInput.addEventListener('input', checkAddFormValidity);
addNameInput.addEventListener('blur', showWarningIfEmpty);

addRateInput.addEventListener('keydown', enforceValidFormat);
addRateInput.addEventListener('input', checkAddFormValidity);
addNameInput.addEventListener('blur', showWarningIfEmpty);

addBalanceInput.addEventListener('keydown', enforceValidFormat);
addBalanceInput.addEventListener('input', checkAddFormValidity);
addNameInput.addEventListener('blur', showWarningIfEmpty);

addDepositInput.addEventListener('keydown', enforceValidFormat);
addDepositInput.addEventListener('input', checkAddFormValidity);
addNameInput.addEventListener('blur', showWarningIfEmpty);

//* For Add customer modal
addButton.addEventListener('click', () => {
  openModal(addCustomerModal);
});

closeAddModalButton.addEventListener('click', () => {
  closeModal(addCustomerModal);
});

createButton.addEventListener('click', async () => {
  const id = uuidv4();
  const name = document.getElementById('add-name-input').value;
  const status = document.getElementById('add-status-input').value;
  const rate = document.getElementById('add-rate-input').value;
  const balance = document.getElementById('add-balance-input').value;
  const deposit = document.getElementById('add-deposit-input').value;
  const description = document.getElementById('add-description-input').value;

  // Create a new Customer instance
  const newCustomer = new Customer(id, name, status, rate, balance, deposit, description);
  closeModal(addCustomerModal);
  // Send a POST request to the API
  await httpRequest(HTTP_METHODS.POST, newCustomer.toJSON());
  // LoadCustomers();
});

//* For Edit customer modal
editButton.addEventListener('click', () => {
  openModal(editCustomerModal);
});

closeEditModalButton.addEventListener('click', () => {
  closeModal(editCustomerModal);
});

//* For View customer modal
viewButton.addEventListener('click', () => {
  openModal(viewCustomerModal);
});

closeViewModalButton.addEventListener('click', () => {
  closeModal(viewCustomerModal);
});
