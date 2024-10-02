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
import createCustomerModal from './templates/customer-modal';

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
// const confirmButton = document.querySelector('.confirm-button');

// const closeCustomerModalButton = document.querySelector('.customer-modal .close-button');
const closeViewModalButton = document.querySelector('.view-customer-modal .close-button');
// const customerModal = document.querySelector('.customer-modal');
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
  if (modalElement.classList.contains('customer-modal')) {
    modalElement.classList.remove('open'); // Hide the modal
    while (modalElement.firstChild) {
      modalElement.removeChild(modalElement.firstChild);
    }
  } else {
    modalElement.classList.remove('open'); // Hide the modal
    // Reset all content for view modal
    const contentFields = document.querySelectorAll('[id$="-content"]');
    contentFields.forEach((field) => {
      const temp = field;
      temp.textContent = '';
    });
  }

  modalOverlay.classList.remove('open'); // Hide the overlay
}

//* For Customer modal

// Mode of the modal: add or edit
let isAddMode = false;

// Add/Edit form validation
function checkFormValidity() {
  const confirmButton = document.querySelector('.confirm-button');
  const nameInput = document.getElementById('name-input');
  const rateInput = document.getElementById('rate-input');
  const balanceInput = document.getElementById('balance-input');
  const depositInput = document.getElementById('deposit-input');
  const isFormValid =
    nameInput.value && rateInput.value && balanceInput.value && depositInput.value;
  confirmButton.disabled = !isFormValid;
}

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

  let previousNameValue = '';
  let previousRateValue = '';
  let previousBalanceValue = '';
  let previousDepositValue = '';

  nameInput.addEventListener('input', enforceMaxLength);
  nameInput.addEventListener('input', checkFormValidity);
  nameInput.addEventListener('blur', showErrorIfEmpty);

  nameInput.addEventListener('keydown', function () {
    previousNameValue = this.value;
  });

  nameInput.addEventListener('input', function () {
    if (this.value && hasNumbers(this.value)) {
      this.value = previousNameValue;
    }
  });

  rateInput.addEventListener('input', checkFormValidity);
  rateInput.addEventListener('blur', showErrorIfEmpty);

  rateInput.addEventListener('keydown', function () {
    previousRateValue = this.value;
  });

  rateInput.addEventListener('input', function () {
    if (this.value && !isValid(this.value)) {
      this.value = previousRateValue;
    }
  });

  balanceInput.addEventListener('input', checkFormValidity);
  balanceInput.addEventListener('blur', showErrorIfEmpty);

  balanceInput.addEventListener('keydown', function () {
    previousBalanceValue = this.value;
  });

  balanceInput.addEventListener('input', function () {
    // Allow negative numbers
    const regex = /^(-\d{0,7}(\.\d{0,2})?|\d{1,7}(\.\d{0,2})?)$/;
    if (this.value && !regex.test(this.value)) {
      this.value = previousBalanceValue;
    }
  });

  depositInput.addEventListener('input', checkFormValidity);
  depositInput.addEventListener('blur', showErrorIfEmpty);

  depositInput.addEventListener('keydown', function () {
    previousDepositValue = this.value;
  });

  depositInput.addEventListener('input', function () {
    if (this.value && !isValid(this.value)) {
      this.value = previousDepositValue;
    }
  });

  // Add a new customer with create button
  confirmButton.addEventListener('click', async () => {
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

    if (isAddMode) {
      const id = uuidv4();
      // Create a new Customer instance
      const newCustomer = new Customer(id, name, status, rate, balance, deposit, description);
      // Send a POST request to the API
      await httpRequest(HTTP_METHODS.POST, newCustomer.toJSON());
      addNewTableRow(newCustomer);
    } else {
      const id = currentCustomerID;
      // Create an updated Customer instance
      const updatedCustomer = new Customer(id, name, status, rate, balance, deposit, description);
      // Send a POST request to the API
      await httpRequest(HTTP_METHODS.PUT, updatedCustomer.toJSON(), `${API_BASE_URL}/${id}`);
      loadCustomers();
    }
    closeModal(customerModal);
  });
  checkFormValidity();
}

// Customer modal open and close
addButton.addEventListener('click', () => {
  isAddMode = true;
  createCustomerModal(isAddMode);
  const customerModal = document.querySelector('.customer-modal');
  addEventListenersForModalButtons();
  openModal(customerModal);
});

// Fill the edit form with the current customer's data
async function fillEditModal() {
  isAddMode = false;
  createCustomerModal(isAddMode);
  const customerModal = document.querySelector('.customer-modal');
  addEventListenersForModalButtons();

  const nameInput = document.getElementById('name-input');
  const statusInput = document.getElementById('status-input');
  const rateInput = document.getElementById('rate-input');
  const balanceInput = document.getElementById('balance-input');
  const depositInput = document.getElementById('deposit-input');
  const descriptionInput = document.getElementById('description-input');

  const customer = await httpRequest(
    HTTP_METHODS.GET,
    null,
    `${API_BASE_URL}/${currentCustomerID}`
  );
  nameInput.value = customer.name;
  statusInput.value = customer.status;
  rateInput.value = customer.rate;
  balanceInput.value = customer.balance;
  depositInput.value = customer.deposit;
  descriptionInput.value = customer.description;

  checkFormValidity();
  openModal(customerModal);
}

editButton.addEventListener('click', fillEditModal);

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
