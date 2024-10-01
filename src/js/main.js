import { v4 as uuidv4 } from 'uuid';
import searchInterval from './constants/search';
import { API_BASE_URL, HTTP_METHODS } from './constants/api';
import httpRequest from './utils/http-request';
import debounce from './utils/debounce';
import sortIconDefault from '../assets/icons/sort-default-icon.svg';
import sortIconAsc from '../assets/icons/sort-asc-icon.svg';
import sortIconDesc from '../assets/icons/sort-desc-icon.svg';
import {
  generateTableRows,
  removeAllTableRows,
  addNewTableRow,
  setRowsColor,
  currentCustomerID,
} from './templates/dashboard';

import fillViewModal from './templates/view-modal';

import {
  hasNumbers,
  enforceMaxLength,
  isValid,
  showErrorIfEmpty,
  sanitizeInput,
  combineAndRemoveDuplicates,
} from './utils/helpers';

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

async function loadCustomers() {
  const customers = await httpRequest(HTTP_METHODS.GET);
  removeAllTableRows();
  generateTableRows(customers);
  setRowsColor();
}

loadCustomers();

//* Modal functionality
const addButton = document.querySelector('.add-button');
const editButton = document.querySelector('.edit-button');
const viewButton = document.querySelector('.view-button');
const createButton = document.querySelector('.create-button');
const saveButton = document.querySelector('.save-button');
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

  // Reset all content for view modal
  const contentFields = document.querySelectorAll('[id$="-content"]');
  contentFields.forEach((field) => {
    const temp = field;
    temp.textContent = '';
  });

  modalOverlay.classList.remove('open'); // Hide the overlay
}

//* For Add customer modal
const addNameInput = document.getElementById('add-name-input');
const addRateInput = document.getElementById('add-rate-input');
const addBalanceInput = document.getElementById('add-balance-input');
const addDepositInput = document.getElementById('add-deposit-input');
// Add form validation
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

// Add customer modal open and close
addButton.addEventListener('click', () => {
  openModal(addCustomerModal);
});

closeAddModalButton.addEventListener('click', () => {
  closeModal(addCustomerModal);
});

// Add a new customer with create button
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
  addNewTableRow(newCustomer);
  closeModal(addCustomerModal);
});

//* For Edit customer modal
const editNameInput = document.getElementById('edit-name-input');
const editStatusInput = document.getElementById('edit-status-input');
const editRateInput = document.getElementById('edit-rate-input');
const editBalanceInput = document.getElementById('edit-balance-input');
const editDepositInput = document.getElementById('edit-deposit-input');
const editDescriptionInput = document.getElementById('edit-description-input');
// Edit form validation
function checkEditFormValidity() {
  const isFormValid =
    editNameInput && editRateInput.value && editBalanceInput.value && editDepositInput.value;
  saveButton.disabled = !isFormValid;
}

let previousEditRateValue = '';
let previousEditBalanceValue = '';
let previousEditDepositValue = '';

editRateInput.addEventListener('input', checkEditFormValidity);
editRateInput.addEventListener('keydown', function () {
  previousEditRateValue = this.value;
});
editRateInput.addEventListener('input', function () {
  if (this.value && !isValid(this.value)) {
    this.value = previousEditRateValue;
  }
});

editBalanceInput.addEventListener('input', checkEditFormValidity);
editBalanceInput.addEventListener('keydown', function () {
  previousEditBalanceValue = this.value;
});
editBalanceInput.addEventListener('input', function () {
  // Allow negative numbers
  const regex = /^(-\d{0,7}(\.\d{0,2})?|\d{1,7}(\.\d{0,2})?)$/;
  if (this.value && !regex.test(this.value)) {
    this.value = previousEditBalanceValue;
  }
});

editDepositInput.addEventListener('input', checkEditFormValidity);
editDepositInput.addEventListener('keydown', function () {
  previousEditDepositValue = this.value;
});

editDepositInput.addEventListener('input', function () {
  if (this.value && !isValid(this.value)) {
    this.value = previousEditDepositValue;
  }
});

// Fill the edit form with the current customer's data
async function fillEditModal() {
  const customer = await httpRequest(
    HTTP_METHODS.GET,
    null,
    `${API_BASE_URL}/${currentCustomerID}`
  );
  editNameInput.value = customer.name;
  editStatusInput.value = customer.status;
  editRateInput.value = customer.rate;
  editBalanceInput.value = customer.balance;
  editDepositInput.value = customer.deposit;
  editDescriptionInput.value = customer.description;

  openModal(editCustomerModal);
}

editButton.addEventListener('click', fillEditModal);

// Edit current customer with save button
saveButton.addEventListener('click', async () => {
  const id = currentCustomerID;
  const name = document.getElementById('edit-name-input').value;
  const status = document.getElementById('edit-status-input').value;
  let rate = document.getElementById('edit-rate-input').value;
  let balance = document.getElementById('edit-balance-input').value;
  let deposit = document.getElementById('edit-deposit-input').value;
  const description = document.getElementById('edit-description-input').value;
  // Remove any trailing decimal points or negative signs
  rate = sanitizeInput(rate);
  balance = sanitizeInput(balance);
  deposit = sanitizeInput(deposit);
  // Create an updated Customer instance
  const updatedCustomer = new Customer(id, name, status, rate, balance, deposit, description);
  // Send a POST request to the API
  await httpRequest(HTTP_METHODS.PUT, updatedCustomer.toJSON(), `${API_BASE_URL}/${id}`);
  loadCustomers();
  closeModal(editCustomerModal);
});

closeEditModalButton.addEventListener('click', () => {
  closeModal(editCustomerModal);
});

//* For View customer modal
async function viewCustomer() {
  const customer = await httpRequest(
    HTTP_METHODS.GET,
    null,
    `${API_BASE_URL}/${currentCustomerID}`
  );
  fillViewModal(customer);
  openModal(viewCustomerModal);
}

viewButton.addEventListener('click', viewCustomer);

closeViewModalButton.addEventListener('click', () => {
  closeModal(viewCustomerModal);
});

//* Search functionality
const searchInput = document.querySelector('.search-input');

async function searchCustomers() {
  const searchValue = searchInput.value.toLowerCase();
  // Fetch customers by name
  const nameCustomers = await httpRequest(
    HTTP_METHODS.GET,
    null,
    `${API_BASE_URL}?name_like=${searchValue}`
  );

  // Fetch customers by status
  const statusCustomers = await httpRequest(
    HTTP_METHODS.GET,
    null,
    `${API_BASE_URL}?status_like=${searchValue}`
  );

  // Combine and remove duplicates
  const customers = combineAndRemoveDuplicates(nameCustomers, statusCustomers);

  // Clear existing table rows
  removeAllTableRows();

  // Populate table with filtered customers
  generateTableRows(customers);
}

// Attach the debounce function to the search input
searchInput.addEventListener('input', debounce(searchCustomers, searchInterval));

//* Sort functionality
const sortButton = document.querySelector('.sort-button');
const sortButtonIcon = document.querySelector('.sort-button img');

const sortingStates = ['default', 'asc', 'desc'];
let currentSortingState = 0;

sortButton.addEventListener('click', async () => {
  currentSortingState = (currentSortingState + 1) % 3;
  if (currentSortingState === 0) {
    sortButtonIcon.src = sortIconDefault;
    loadCustomers();
  } else {
    sortButtonIcon.src = currentSortingState === 1 ? sortIconAsc : sortIconDesc;
    const customers = await httpRequest(
      HTTP_METHODS.GET,
      null,
      `${API_BASE_URL}?_sort=name&_order=${sortingStates[currentSortingState]}`
    );
    removeAllTableRows();
    generateTableRows(customers);
    setRowsColor();
  }
});
