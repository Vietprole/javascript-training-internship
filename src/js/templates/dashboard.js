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

// Store customer information in data-* attributes
function storeCustomerDataInMenuButton(customer, button) {
  const menuButton = button;
  menuButton.dataset.customerId = customer.id;
  menuButton.dataset.customerName = customer.name;
  menuButton.dataset.customerStatus = customer.status;
  menuButton.dataset.customerRate = customer.rate;
  menuButton.dataset.customerBalance = customer.balance;
  menuButton.dataset.customerDeposit = customer.deposit;
  menuButton.dataset.customerDescription = customer.description;
}

// Add event listeners to menu button
function addEventListenerToMenuButton(customer, button) {
  const menuButton = button;
  menuButton.addEventListener('click', () => {
    // Create the action menu
    createActionMenu();
    // Open the action menu at the position relative to the menu button
    const actionMenu = document.querySelector('.action-menu');
    state.currentCustomer = customer;
    const { top, left } = getActionMenuPosition(button);
    actionMenu.style.top = top;
    actionMenu.style.left = left;
    actionMenu.classList.add('open');
  });
}

// Store customer information in data-* attributes and add event listener to menu button
function loadMenuButton(customer, button) {
  storeCustomerDataInMenuButton(customer, button);
  addEventListenerToMenuButton(customer, button);
}

function loadAllMenuButtons(customers) {
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

function createNameCell(name, id) {
  const nameCell = document.createElement('div');
  nameCell.classList.add('name-cell');
  // Create a name div
  const nameDiv = document.createElement('div');
  nameDiv.classList.add('name');
  nameDiv.textContent = name;
  // Create a id div
  const idDiv = document.createElement('div');
  idDiv.classList.add('id');
  idDiv.textContent = id;
  // Append name and id divs to name cell
  nameCell.append(nameDiv, idDiv);
  return nameCell;
}

function createDescriptionCell(description) {
  const descriptionCell = document.createElement('div');
  descriptionCell.classList.add('description-cell');
  descriptionCell.textContent = description;
  return descriptionCell;
}

function createStatusCell(status) {
  const statusCell = document.createElement('div');
  statusCell.classList.add('status-cell');
  // Add class based on status
  statusCell.classList.add(`status-${status.toLowerCase()}`);
  statusCell.textContent = status;
  return statusCell;
}

function createSymbolSpan(symbol) {
  // Create a reusable symbol element
  const symbolSpan = document.createElement('span');
  symbolSpan.textContent = symbol;
  return symbolSpan;
}

function createCurrencyDiv(currency) {
  const currencyDiv = document.createElement('div');
  currencyDiv.classList.add('currency');
  currencyDiv.textContent = currency;
  return currencyDiv;
}

function createRateCell(rate, symbol, currency) {
  const rateCell = document.createElement('div');
  rateCell.classList.add('rate-cell');
  // Create a rate amount div
  const rateAmount = document.createElement('div');
  rateAmount.classList.add('amount');
  const rateSymbol = createSymbolSpan(symbol);
  const rateSpan = document.createElement('span');
  rateSpan.textContent = formatNumberWithCommas(rate);
  rateAmount.append(rateSymbol, rateSpan);
  // Create a rate currency div
  const rateCurrency = createCurrencyDiv(currency);
  rateCell.append(rateAmount, rateCurrency);
  return rateCell;
}

function createBalanceCell(balance, symbol, currency) {
  const balanceCell = document.createElement('div');
  balanceCell.classList.add('balance-cell');
  // Create a balance amount div
  const balanceAmount = document.createElement('div');
  balanceAmount.classList.add('amount');
  balanceAmount.classList.add('positive');
  const balanceSymbol = createSymbolSpan(symbol);
  const balanceSpan = document.createElement('span');
  balanceSpan.textContent = formatNumberWithCommas(balance);
  if (balance < 0) {
    balanceSymbol.textContent = `-${symbol}`;
    balanceSpan.textContent = formatNumberWithCommas(Math.abs(balance).toString());
    balanceAmount.classList.remove('positive');
    balanceAmount.classList.add('negative');
  }
  balanceAmount.append(balanceSymbol, balanceSpan);
  // Create a balance currency div
  const balanceCurrency = createCurrencyDiv(currency);
  balanceCell.append(balanceAmount, balanceCurrency);
  return balanceCell;
}

function createDepositCell(deposit, symbol, currency) {
  // Create a deposit cell
  const depositCell = document.createElement('div');
  depositCell.classList.add('deposit-cell');
  // Create a deposit amount div
  const depositAmount = document.createElement('div');
  depositAmount.classList.add('amount');
  const depositSymbol = createSymbolSpan(symbol);
  const depositSpan = document.createElement('span');
  depositSpan.textContent = formatNumberWithCommas(deposit);
  depositAmount.append(depositSymbol, depositSpan);
  // Create a deposit currency div
  const depositCurrency = createCurrencyDiv(currency);
  depositCell.append(depositAmount, depositCurrency);
  return depositCell;
}

function createMenuButton(iconSrc) {
  // Create a menu button
  const menuButton = document.createElement('div');
  menuButton.classList.add('menu-button', 'icon-wrapper');
  const menuImg = document.createElement('img');
  menuImg.src = iconSrc;
  menuImg.alt = 'Menu icon';
  menuButton.appendChild(menuImg);
  return menuButton;
}

function createTableRow(customer) {
  // Create a new table row
  const newRow = document.createElement('div');
  newRow.classList.add('table-row');

  // Create a name cell
  const nameCell = createNameCell(customer.name, customer.id);

  // Create a description cell
  const descriptionCell = createDescriptionCell(customer.description);

  // Create a status cell
  const statusCell = createStatusCell(customer.status);

  // Create a rate cell
  const rateCell = createRateCell(customer.rate, customer.symbol, customer.currency);

  // Create a balance cell
  const balanceCell = createBalanceCell(customer.balance, customer.symbol, customer.currency);

  // Create a deposit cell
  const depositCell = createDepositCell(customer.deposit, customer.symbol, customer.currency);

  // Create a menu button
  const menuButton = createMenuButton(menuIcon);

  // Append all cells to the new row
  newRow.append(
    nameCell,
    descriptionCell,
    statusCell,
    rateCell,
    balanceCell,
    depositCell,
    menuButton
  );

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
  // Show no customers found message if there are no customers
  if (customers.length === 0) {
    showNoCustomersFound();
  } else {
    removeNoCustomersFound();
  }

  // Create a new table row for each customer
  customers.forEach((customer) => {
    const newRow = createTableRow(customer);
    const tableBody = document.querySelector('.table-body');
    tableBody.appendChild(newRow);
  });
  // If there is already an event listener to close the action menu, remove it
  window.removeEventListener('click', closeActionMenuWhenClickedOutside);
  // Load the menu buttons by store customers data and add event listeners to create and open/close the action menu
  loadAllMenuButtons(customers);
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
  // Select the table row that is being edited
  const menuButton = document.querySelector(`div[data-customer-id="${updatedCustomer.id}"]`);
  const currentTableRow = menuButton.closest('.table-row');
  // Get the index of the table row being edited
  const tableBody = document.querySelector('.table-body');
  const currentIndex = Array.from(tableBody.children).indexOf(currentTableRow);
  // Remove the current table row and insert the edited table row at the same position
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
