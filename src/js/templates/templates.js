import menuIcon from '../../assets/icons/menu-icon.svg';

let currentCustomerID;

//* Action menu functionality
function closeActionMenuWhenClickedOutside(event) {
  const actionMenuButtons = document.querySelectorAll('.menu-button');
  const actionMenu = document.querySelector('.action-menu');
  // Close the action menu if the user clicks outside of it
  // Check if action menu's buttons is not the target to prevent closing the menu when clicking on them
  if (!Array.from(actionMenuButtons).some((button) => button.contains(event.target))) {
    actionMenu.classList.remove('open');
  }
}

function loadActionMenu() {
  const actionMenuButtons = document.querySelectorAll('.menu-button');
  const actionMenu = document.querySelector('.action-menu');
  actionMenuButtons.forEach((button) => {
    button.addEventListener('click', () => {
      currentCustomerID = button.id;
      const { top, left } = button.getBoundingClientRect();
      // Get the current scroll position
      const scrollTop = window.scrollY || document.documentElement.scrollTop; // scrollTop for older browsers
      const scrollLeft = window.scrollX || document.documentElement.scrollLeft; // scrollLeft for older browsers
      actionMenu.style.top = `${top + scrollTop}px`;
      actionMenu.style.left = `${left + scrollLeft - 100}px`;
      actionMenu.classList.add('open');
    });
  });

  window.addEventListener('click', closeActionMenuWhenClickedOutside);
}

// Function to remove all table-row div elements
function removeAllTableRows() {
  const tableRows = document.querySelectorAll('.table-row');
  tableRows.forEach((row) => row.remove());
}

// Function to set color of row based on their odd or even index
function setRowsColor() {
  const tableRows = document.querySelectorAll('.table-row');
  tableRows.forEach((row, index) => {
    if (index % 2 === 0) {
      row.classList.add('even');
    } else {
      row.classList.add('odd');
    }
  });
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

  // Create a reusable dollar sign element
  const dollarSign = document.createElement('span');
  dollarSign.textContent = '$';

  // Create a reusable currency element
  const currency = document.createElement('div');
  currency.classList.add('currency');
  currency.textContent = 'CAD';

  // Create a rate cell
  const rateCell = document.createElement('div');
  rateCell.classList.add('rate-cell');
  // Create a rate amount div
  const rateAmount = document.createElement('div');
  rateAmount.classList.add('amount');
  const rateDollarSign = dollarSign.cloneNode(true); // Clone the dollar sign element
  const rate = document.createElement('span');
  rate.textContent = customer.rate;
  rateAmount.appendChild(rateDollarSign);
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
  const balanceDollarSign = dollarSign.cloneNode(true); // Clone the dollar sign element
  const balance = document.createElement('span');
  balance.textContent = customer.balance;
  if (customer.balance < 0) {
    balanceDollarSign.textContent = '-$';
    balance.textContent = Math.abs(customer.balance);
    balanceAmount.classList.remove('positive');
    balanceAmount.classList.add('negative');
  }
  balanceAmount.appendChild(balanceDollarSign);
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
  const depositDollarSign = dollarSign.cloneNode(true); // Clone the dollar sign element
  const deposit = document.createElement('span');
  deposit.textContent = customer.deposit;
  depositAmount.appendChild(depositDollarSign);
  depositAmount.appendChild(deposit);
  // Create a deposit currency div
  const depositCurrency = currency.cloneNode(true); // Clone the currency element
  depositCell.appendChild(depositAmount);
  depositCell.appendChild(depositCurrency);

  // Create a menu button
  const menuButton = document.createElement('div');
  menuButton.classList.add('menu-button', 'icon-wrapper');
  menuButton.id = customer.id;
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

//* Get customers to view on Dashboard
function generateTableRows(customers) {
  customers.forEach((customer) => {
    const newRow = createTableRow(customer);
    const tableBody = document.querySelector('.table-body');
    tableBody.appendChild(newRow);
  });
  window.removeEventListener('click', closeActionMenuWhenClickedOutside);
  loadActionMenu();
}

function addNewTableRow(customer) {
  const newRow = createTableRow(customer);
  const tableBody = document.querySelector('.table-body');
  tableBody.appendChild(newRow);
  setRowsColor();
}

export { generateTableRows, removeAllTableRows, addNewTableRow, setRowsColor, currentCustomerID };
