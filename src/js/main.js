import { v4 as uuidv4 } from 'uuid';
import searchInterval from './constants/search';
import sortingStates from './constants/sort';
import { API_BASE_URL, HTTP_METHODS } from './constants/api';
import httpRequest from './utils/http-request';
import debounce from './utils/debounce';
import sortIconDefault from '../assets/icons/sort-default-icon.svg';
import sortIconAsc from '../assets/icons/sort-asc-icon.svg';
import sortIconDesc from '../assets/icons/sort-desc-icon.svg';
import {
  generateTableRows,
  removeAllTableRows,
  removeTableRow,
  addNewTableRow,
  setRowsColor,
  currentCustomer,
} from './templates/dashboard';

import fillViewModal from './templates/view-modal';
import createCustomerModal from './templates/customer-modal';
import createDeleteConfirmationModal from './templates/delete-confirmation-modal';

import {
  hasNumbers,
  enforceMaxLength,
  isValid,
  showErrorIfEmpty,
  sanitizeInput,
  combineAndRemoveDuplicates,
  sortCustomersByName,
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

//* Loader functionality
const loader = document.querySelector('.loader-container');

function showLoader() {
  loader.style.display = 'flex';
}

function hideLoader() {
  loader.style.display = 'none';
}

async function loadCustomers() {
  showLoader();
  try {
    const customers = await httpRequest(HTTP_METHODS.GET);
    removeAllTableRows();
    generateTableRows(customers);
    setRowsColor();
  } catch (error) {
    console.error('Failed to load customers:', error);
  } finally {
    hideLoader();
  }
}

loadCustomers();

let currentSortingState = sortingStates.DEFAULT;

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

  // Sort the customers by name
  sortCustomersByName(customers, currentSortingState);

  // Clear existing table rows
  removeAllTableRows();

  // Populate table with filtered customers
  generateTableRows(customers);

  setRowsColor();
}

// Attach the debounce function to the search input
searchInput.addEventListener('input', debounce(searchCustomers, searchInterval));

//* Modal functionality
const addButton = document.querySelector('.add-button');
const editButton = document.querySelector('.edit-button');
const viewButton = document.querySelector('.view-button');
const closeViewModalButton = document.querySelector('.view-customer-modal .close-button');
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
  if (
    modalElement.classList.contains('customer-modal') ||
    modalElement.classList.contains('delete-confirmation-modal')
  ) {
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

function editCurrentCustomerRow(updatedCustomer) {
  const menuButton = document.querySelector(`div[data-customer-id="${updatedCustomer.id}"]`);
  let sibling = menuButton.previousElementSibling;
  while (sibling) {
    switch (sibling.classList[0]) {
      case 'name-cell':
        const nameCell = sibling;
        const nameField = nameCell.querySelector('.name');
        nameField.textContent = updatedCustomer.name;
        const idField = nameCell.querySelector('.id');
        idField.textContent = updatedCustomer.id;
        sibling = null;
        break;
      case 'description-cell':
        sibling.textContent = updatedCustomer.description;
        sibling = sibling.previousElementSibling;
        break;
      case 'status-cell':
        sibling.textContent = updatedCustomer.status;
        // Add class based on status
        sibling.classList.add(`status-${updatedCustomer.status.toLowerCase()}`);
        sibling = sibling.previousElementSibling;
        break;
      case 'rate-cell':
        sibling.querySelector('.amount').querySelectorAll('span')[1].textContent = updatedCustomer.rate;
        sibling = sibling.previousElementSibling;
        break;
      case 'balance-cell':
        const balanceDollarSign = sibling.querySelector('.amount').querySelectorAll('span')[0];
        const balance = sibling.querySelector('.amount').querySelectorAll('span')[1];
        const balanceAmount = sibling.querySelector('.amount');
        balance.textContent = updatedCustomer.balance;
        if (updatedCustomer.balance < 0) {
          balanceDollarSign.textContent = '-$';
          balance.textContent = Math.abs(updatedCustomer.balance);
          balanceAmount.classList.remove('positive');
          balanceAmount.classList.add('negative');
        }
        sibling = sibling.previousElementSibling;
        break;
      case 'deposit-cell':
        sibling.querySelector('.amount').querySelectorAll('span')[1].textContent = updatedCustomer.deposit;
        sibling = sibling.previousElementSibling;
        break;
      default:
        sibling = null;
        break;
    }
  }
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

  function setPreviousValue(event) {
    switch (event.target) {
      case nameInput:
        previousNameValue = event.target.value;
        break;
      case rateInput:
        previousRateValue = event.target.value;
        break;
      case balanceInput:
        previousBalanceValue = event.target.value;
        break;
      case depositInput:
        previousDepositValue = event.target.value;
        break;
    }
  }

  function validateAndRevertInput(event) {
    switch (event.target) {
      case nameInput:
        if (event.target.value && hasNumbers(event.target.value)) {
          event.target.value = previousNameValue;
        }
        break;
      case rateInput:
        if (event.target.value && !isValid(event.target.value)) {
          event.target.value = previousRateValue;
        }
        break;
      case balanceInput: {
        // Allow negative numbers
        const regex = /^(-\d{0,7}(\.\d{0,2})?|\d{1,7}(\.\d{0,2})?)$/;
        if (event.target.value && !regex.test(event.target.value)) {
          event.target.value = previousBalanceValue;
        }
        break;
      }
      case depositInput:
        if (event.target.value && !isValid(event.target.value)) {
          event.target.value = previousDepositValue;
        }
        break;
    }
  }
  nameInput.addEventListener('input', enforceMaxLength);
  nameInput.addEventListener('input', checkFormValidity);
  nameInput.addEventListener('blur', showErrorIfEmpty);
  nameInput.addEventListener('keydown', setPreviousValue);
  nameInput.addEventListener('input', validateAndRevertInput);

  rateInput.addEventListener('input', checkFormValidity);
  rateInput.addEventListener('blur', showErrorIfEmpty);
  rateInput.addEventListener('keydown', setPreviousValue);
  rateInput.addEventListener('input', validateAndRevertInput);

  balanceInput.addEventListener('input', checkFormValidity);
  balanceInput.addEventListener('blur', showErrorIfEmpty);
  balanceInput.addEventListener('keydown', setPreviousValue);
  balanceInput.addEventListener('input', validateAndRevertInput);

  depositInput.addEventListener('input', checkFormValidity);
  depositInput.addEventListener('blur', showErrorIfEmpty);
  depositInput.addEventListener('keydown', setPreviousValue);
  depositInput.addEventListener('input', validateAndRevertInput);

  async function handleAddOrEditCustomer(event) {
    event.target.disabled = true;
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
      const { id } = currentCustomer;
      // Create an updated Customer instance
      const updatedCustomer = new Customer(id, name, status, rate, balance, deposit, description);
      // Send a POST request to the API
      await httpRequest(HTTP_METHODS.PUT, updatedCustomer.toJSON(), `${API_BASE_URL}/${id}`);
      editCurrentCustomerRow(updatedCustomer);
    }
    closeModal(customerModal);
  }
  confirmButton.addEventListener('click', handleAddOrEditCustomer);
  checkFormValidity();
}

// Customer modal open and close
function handleOpenAddModal() {
  isAddMode = true;
  createCustomerModal(isAddMode);
  const customerModal = document.querySelector('.customer-modal');
  addEventListenersForModalButtons();
  openModal(customerModal);
}

addButton.addEventListener('click', handleOpenAddModal);

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

  const customer = currentCustomer;
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
  fillViewModal(currentCustomer);
  openModal(viewCustomerModal);
}

viewButton.addEventListener('click', viewCustomer);

closeViewModalButton.addEventListener('click', () => {
  closeModal(viewCustomerModal);
});

//* Sort functionality
const sortButton = document.querySelector('.sort-button');
const sortButtonIcon = document.querySelector('.sort-button img');

function sortCustomers() {
  currentSortingState = (currentSortingState + 1) % 3;
  if (currentSortingState === sortingStates.DEFAULT) {
    sortButtonIcon.src = sortIconDefault;
  } else {
    sortButtonIcon.src = currentSortingState === sortingStates.ASC ? sortIconAsc : sortIconDesc;
  }
  searchCustomers();
}

sortButton.addEventListener('click', sortCustomers);

//* Delete functionality
const deleteButton = document.querySelector('.delete-button');

function closeDeleteConfirmationModal() {
  const deleteConfirmationModal = document.querySelector('.delete-confirmation-modal');
  closeModal(deleteConfirmationModal);
}

async function removeCustomer(event) {
  event.target.disabled = true;
  await httpRequest(HTTP_METHODS.DELETE, null, `${API_BASE_URL}/${currentCustomer.id}`);
  removeTableRow(currentCustomer.id);
  closeDeleteConfirmationModal();
}

function createAndOpenDeleteConfirmationModal() {
  createDeleteConfirmationModal();
  const deleteConfirmationModal = document.querySelector('.delete-confirmation-modal');
  const deleteConfirmButton = document.querySelector('.delete-confirmation-modal .confirm-button');
  const deleteCloseButton = document.querySelector('.delete-confirmation-modal .close-button');
  deleteCloseButton.addEventListener('click', closeDeleteConfirmationModal);
  deleteConfirmButton.addEventListener('click', removeCustomer);
  openModal(deleteConfirmationModal);
}

deleteButton.addEventListener('click', createAndOpenDeleteConfirmationModal);
