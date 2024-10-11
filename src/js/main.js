import searchInterval from './constants/search';
import sortingStates from './constants/sort';
import { API_BASE_URL } from './constants/api';
import { Get } from './utils/http-request';
import debounce from './utils/debounce';
import sortIconDefault from '../assets/icons/sort-default-icon.svg';
import sortIconAsc from '../assets/icons/sort-asc-icon.svg';
import sortIconDesc from '../assets/icons/sort-desc-icon.svg';
import { generateTableRows, removeAllTableRows, setRowsColor } from './templates/dashboard';
import { createCustomerModal, addEventListenersForModalButtons } from './templates/customer-modal';
import state from './constants/state';
import { combineAndRemoveDuplicates, sortCustomersByName } from './utils/helpers';
import { openModal } from './utils/modal';
// Loader functionality
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
    const customers = await Get();
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

// Search functionality
const searchInput = document.querySelector('.search-input');

async function searchCustomers() {
  const searchValue = searchInput.value.toLowerCase();
  // Fetch customers by name
  const nameCustomers = await Get(`${API_BASE_URL}?name_like=${searchValue}`);

  // Fetch customers by status
  const statusCustomers = await Get(`${API_BASE_URL}?status_like=${searchValue}`);

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

// Add button functionality
const addButton = document.querySelector('.add-button');

// Customer add modal open and close
function handleOpenAddModal() {
  state.isAddMode = true;
  createCustomerModal(state.isAddMode);
  const customerModal = document.querySelector('.customer-modal');
  openModal(customerModal);
}

addButton.addEventListener('click', handleOpenAddModal);

// Sort functionality
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
