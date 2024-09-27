import { v4 as uuidv4 } from 'uuid';
import { API_BASE_URL, HTTP_METHODS } from './constants/api';
import httpRequest from './utils/http-request';
import menuIcon from '../assets/icons/menu-icon.svg';

import { hasNumbers, enforceMaxLength, isValid, showErrorIfEmpty, sanitizeInput } from './utils/helpers';

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
// Function to check if all inputs are valid
function checkAddFormValidity() {
  const isFormValid =
    addNameInput.value && addRateInput.value && addBalanceInput.value && addDepositInput.value;
  createButton.disabled = !isFormValid;
}

let previousNameValue = '';
let previousRateValue = '';
let previousBalanceValue = '';
let previousDepositValue = '';

addNameInput.addEventListener('input', enforceMaxLength);
addNameInput.addEventListener('input', checkAddFormValidity);
addNameInput.addEventListener('blur', showErrorIfEmpty);
addNameInput.addEventListener('keydown', function () {
  previousNameValue = this.value;
});
addNameInput.addEventListener('input', function () {
  if (this.value && hasNumbers(this.value)) {
    this.value = previousNameValue;
  }
});

addRateInput.addEventListener('input', checkAddFormValidity);
addRateInput.addEventListener('blur', showErrorIfEmpty);
addRateInput.addEventListener('keydown', function () {
  previousRateValue = this.value;
});
addRateInput.addEventListener('input', function () {
  if (this.value && !isValid(this.value)) {
    this.value = previousRateValue;
  }
});

addBalanceInput.addEventListener('input', checkAddFormValidity);
addBalanceInput.addEventListener('blur', showErrorIfEmpty);
addBalanceInput.addEventListener('keydown', function () {
  previousBalanceValue = this.value;
});
addBalanceInput.addEventListener('input', function () {
  // Allow negative numbers
  const regex = /^(-\d{0,7}(\.\d{0,2})?|\d{1,7}(\.\d{0,2})?)$/;
  if (this.value && !regex.test(this.value)) {
    this.value = previousBalanceValue;
  }
});

addDepositInput.addEventListener('input', checkAddFormValidity);
addDepositInput.addEventListener('blur', showErrorIfEmpty);
addDepositInput.addEventListener('keydown', function () {
  previousDepositValue = this.value;
});
addDepositInput.addEventListener('input', function () {
  if (this.value && !isValid(this.value)) {
    this.value = previousDepositValue;
  }
});

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
  let rate = document.getElementById('add-rate-input').value;
  let balance = document.getElementById('add-balance-input').value;
  let deposit = document.getElementById('add-deposit-input').value;
  const description = document.getElementById('add-description-input').value;
  // Remove any trailing decimal points or negative signs
  rate = sanitizeInput(rate);
  balance = sanitizeInput(balance);
  deposit = sanitizeInput(deposit);
  // Create a new Customer instance
  const newCustomer = new Customer(id, name, status, rate, balance, deposit, description);
  // Send a POST request to the API
  await httpRequest(HTTP_METHODS.POST, newCustomer.toJSON());
  closeModal(addCustomerModal);
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
