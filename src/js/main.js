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

// Function to remove all table-row div elements
function removeAllTableRows() {
  const tableRows = document.querySelectorAll('.table-row');
  tableRows.forEach((row) => row.remove());
}

// Get customers to view on Dashboard
// TODO - This should be improved after implementing the Add customer functionality
function LoadCustomers() {
  removeAllTableRows();
  httpRequest(HTTP_METHODS.GET).then((customers) => {
    customers.forEach((customer) => {
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
      const balanceDollarSign = dollarSign.cloneNode(true); // Clone the dollar sign element
      const balance = document.createElement('span');
      balance.textContent = customer.balance;
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

      const tableHeader = document.querySelector('.table-header');
      tableHeader.insertAdjacentElement('afterend', newRow);
    });
  });
}
LoadCustomers();
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

//* For Add customer modal
addButton.addEventListener('click', () => {
  openModal(addCustomerModal);
});

closeAddModalButton.addEventListener('click', () => {
  closeModal(addCustomerModal);
});

createButton.addEventListener('click', () => {
  const id = uuidv4();
  const name = document.getElementById('add-name-input').value;
  const status = document.getElementById('add-status-input').value;
  const rate = document.getElementById('add-rate-input').value;
  const balance = document.getElementById('add-balance-input').value;
  const deposit = document.getElementById('add-deposit-input').value;
  const description = document.getElementById('add-description-input').value;

  // Create a new Customer instance
  const newCustomer = new Customer(id, name, status, rate, balance, deposit, description);

  // Send a POST request to the API
  httpRequest(HTTP_METHODS.POST, newCustomer.toJSON());
  LoadCustomers();
  closeModal(addCustomerModal);
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
