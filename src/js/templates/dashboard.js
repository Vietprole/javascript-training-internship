import menuIcon from '../../assets/icons/menu-icon.svg';
import state from '../constants/state';
import { getActionMenuPosition, formatNumberWithCommas } from '../utils/helpers';
import createActionMenu from './action-menu';

// Click outside of the action menu to close it
// This won't work if you click on another menu button
function closeActionMenuWhenClickedOutside(event) {
  const actionMenuButtons = document.querySelectorAll('.menu-button');
  const actionMenu = document.querySelector('.action-menu');
  // Close the action menu if the user clicks outside of it
  // Check if action menu's buttons is not the target to prevent closing the menu when clicking on them
  if (!Array.from(actionMenuButtons).some((button) => button.contains(event.target))) {
    while (actionMenu.firstChild) {
      actionMenu.removeChild(actionMenu.firstChild);
    }
    actionMenu.classList.remove('open');
  }
}

// Add data and event listeners to menu buttons
function loadMenuButton(customer, button) {
  const menuButton = button;
  menuButton.dataset.customerId = customer.id;
  menuButton.dataset.customerName = customer.name;
  menuButton.dataset.customerStatus = customer.status;
  menuButton.dataset.customerRate = customer.rate;
  menuButton.dataset.customerBalance = customer.balance;
  menuButton.dataset.customerDeposit = customer.deposit;
  menuButton.dataset.customerDescription = customer.description;
  menuButton.addEventListener('click', () => {
    // If there is already an action menu, delete it
    // This is to account for when user click on another menu button
    if (document.querySelector('.action-menu')) {
      const actionMenu = document.querySelector('.action-menu');
      while (actionMenu.firstChild) {
        actionMenu.removeChild(actionMenu.firstChild);
      }
    }
    createActionMenu();
    const actionMenu = document.querySelector('.action-menu');
    state.currentCustomer = customer;
    const { top, left } = getActionMenuPosition(button);
    actionMenu.style.top = top;
    actionMenu.style.left = left;
    actionMenu.classList.add('open');
  });
}

function loadActionMenu(customers) {
  const actionMenuButtons = document.querySelectorAll('.menu-button');
  actionMenuButtons.forEach((button, index) => {
    const customer = customers[index];
    // Store customer information in data-* attributes
    loadMenuButton(customer, button);
  });

  window.addEventListener('click', closeActionMenuWhenClickedOutside);
}

// Function to remove all table-row div elements
function removeAllTableRows() {
  const tableRows = document.querySelectorAll('.table-row');
  tableRows.forEach((row) => row.remove());
}

// Function to remove a table-row div element
function removeTableRow(customerID) {
  const menuButton = document.querySelector(`div[data-customer-id="${customerID}"]`);
  const tableRow = menuButton.closest('.table-row');
  tableRow.remove();
}

function createTableRow(customer) {
  // Create a new table row
  const newRow = document.createElement('div');
  newRow.classList.add('table-row');

  // Create a name cell
  const nameCell = document.createElement('div');
  nameCell.classList.add('name-cell');
  // Create a name div
  const name = document.createElement('div');
  name.classList.add('name');
  name.textContent = customer.name;
  // Create a id div
  const id = document.createElement('div');
  id.classList.add('id');
  id.textContent = customer.id;
  // Append name and id divs to name cell
  nameCell.appendChild(name);
  nameCell.appendChild(id);

  // Create a description cell
  const descriptionCell = document.createElement('div');
  descriptionCell.classList.add('description-cell');
  descriptionCell.textContent = customer.description;

  // Create a status cell
  const statusCell = document.createElement('div');
  statusCell.classList.add('status-cell');
  const { status } = customer;
  // Add class based on status
  statusCell.classList.add(`status-${status.toLowerCase()}`);
  statusCell.textContent = status;

  // Create a reusable symbol element
  const symbol = document.createElement('span');
  symbol.textContent = customer.symbol;

  // Create a reusable currency element
  const currency = document.createElement('div');
  currency.classList.add('currency');
  currency.textContent = customer.currency;

  // Create a rate cell
  const rateCell = document.createElement('div');
  rateCell.classList.add('rate-cell');
  // Create a rate amount div
  const rateAmount = document.createElement('div');
  rateAmount.classList.add('amount');
  const rateSymbol = symbol.cloneNode(true); // Clone the symbol element
  const rate = document.createElement('span');
  rate.textContent = formatNumberWithCommas(customer.rate);
  rateAmount.appendChild(rateSymbol);
  rateAmount.appendChild(rate);
  // Create a rate currency div
  const rateCurrency = currency.cloneNode(true); // Clone the currency element
  rateCell.appendChild(rateAmount);
  rateCell.appendChild(rateCurrency);

  // Create a balance cell
  const balanceCell = document.createElement('div');
  balanceCell.classList.add('balance-cell');
  // Create a balance amount div
  const balanceAmount = document.createElement('div');
  balanceAmount.classList.add('amount');
  balanceAmount.classList.add('positive');
  const balanceSymbol = symbol.cloneNode(true); // Clone the symbol element
  const balance = document.createElement('span');
  balance.textContent = formatNumberWithCommas(customer.balance);
  if (customer.balance < 0) {
    balanceSymbol.textContent = `-${customer.symbol}`;
    balance.textContent = formatNumberWithCommas(Math.abs(customer.balance).toString());
    balanceAmount.classList.remove('positive');
    balanceAmount.classList.add('negative');
  }
  balanceAmount.appendChild(balanceSymbol);
  balanceAmount.appendChild(balance);
  // Create a balance currency div
  const balanceCurrency = currency.cloneNode(true); // Clone the currency element
  balanceCell.appendChild(balanceAmount);
  balanceCell.appendChild(balanceCurrency);

  // Create a deposit cell
  const depositCell = document.createElement('div');
  depositCell.classList.add('deposit-cell');
  // Create a deposit amount div
  const depositAmount = document.createElement('div');
  depositAmount.classList.add('amount');
  const depositSymbol = symbol.cloneNode(true); // Clone the symbol element
  const deposit = document.createElement('span');
  deposit.textContent = formatNumberWithCommas(customer.deposit);
  depositAmount.appendChild(depositSymbol);
  depositAmount.appendChild(deposit);
  // Create a deposit currency div
  const depositCurrency = currency.cloneNode(true); // Clone the currency element
  depositCell.appendChild(depositAmount);
  depositCell.appendChild(depositCurrency);

  // Create a menu button
  const menuButton = document.createElement('div');
  menuButton.classList.add('menu-button', 'icon-wrapper');
  const menuImg = document.createElement('img');
  menuImg.src = menuIcon;
  menuImg.alt = 'Menu icon';
  menuButton.appendChild(menuImg);

  // Append all cells to the new row
  newRow.appendChild(nameCell);
  newRow.appendChild(descriptionCell);
  newRow.appendChild(statusCell);
  newRow.appendChild(rateCell);
  newRow.appendChild(balanceCell);
  newRow.appendChild(depositCell);
  newRow.appendChild(menuButton);

  return newRow;
}

function insertTableRowAtPosition(customer, position) {
  const newRow = createTableRow(customer);
  const tableBody = document.querySelector('.table-body');
  tableBody.insertBefore(newRow, position);
  const menuButton = newRow.querySelector('.menu-button');
  loadMenuButton(customer, menuButton);
}

function showNoCustomersFound() {
  const tableBody = document.querySelector('.table-body');
  const noCustomersFound = document.createElement('div');
  noCustomersFound.classList.add('no-customers-found');
  noCustomersFound.textContent = 'No customers found.';
  tableBody.appendChild(noCustomersFound);
}

function removeNoCustomersFound() {
  const noCustomersFound = document.querySelector('.no-customers-found');
  if (noCustomersFound) {
    noCustomersFound.remove();
  }
}

// Get customers to view on Dashboard
function generateTableRows(customers) {
  if (customers.length === 0) {
    showNoCustomersFound();
  } else {
    removeNoCustomersFound();
  }
  customers.forEach((customer) => {
    const newRow = createTableRow(customer);
    const tableBody = document.querySelector('.table-body');
    tableBody.appendChild(newRow);
  });
  window.removeEventListener('click', closeActionMenuWhenClickedOutside);
  loadActionMenu(customers);
}

// Add a new table row and append it to the top when create new customer
function addNewTableRow(customer) {
  const newRow = createTableRow(customer);
  const tableBody = document.querySelector('.table-body');
  if (tableBody.firstChild) {
    tableBody.insertBefore(newRow, tableBody.firstChild);
  } else {
    tableBody.appendChild(newRow);
  }
  // window.removeEventListener('click', closeActionMenuWhenClickedOutside);
  loadMenuButton(customer, newRow.querySelector('.menu-button'));
}

// Edit the current customer row when edit customer
function editCurrentCustomerRow(updatedCustomer) {
  const menuButton = document.querySelector(`div[data-customer-id="${updatedCustomer.id}"]`);
  const currentTableRow = menuButton.closest('.table-row');
  const tableBody = document.querySelector('.table-body');
  const currentIndex = Array.from(tableBody.children).indexOf(currentTableRow);
  currentTableRow.remove();
  insertTableRowAtPosition(updatedCustomer, tableBody.children[currentIndex]);
}

export {
  generateTableRows,
  removeAllTableRows,
  removeTableRow,
  addNewTableRow,
  editCurrentCustomerRow,
};
