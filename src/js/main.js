// import { v4 as uuidv4 } from 'uuid';
// import { API_BASE_URL, HTTP_METHODS } from './constants/api';
// import httpRequest from './utils/http-request';

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

// httpRequest(HTTP_METHODS.GET);

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
