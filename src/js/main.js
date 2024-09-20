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

const addButton = document.querySelector('.add-button');
const closeAddModalButton = document.querySelector('.add-customer-modal .close-button');
const addCustomerModal = document.querySelector('.add-customer-modal');
const modalOverlay = document.querySelector('.modal-overlay');

function openModal(modal) {
  const modalElement = modal;
  modalElement.style.display = 'block';
  modalOverlay.style.display = 'block'; // Show the overlay
}

function closeModal(modal) {
  const modalElement = modal;
  modalElement.style.display = 'none';
  modalOverlay.style.display = 'none'; // Hide the overlay
}

// function openModalAtPosition(modal, x, y) {
//   const modalElement = modal;
//   modalElement.style.display = 'block';
//   modalElement.style.top = `${y}px`;
//   modalElement.style.left = `${x}px`;
// }

addButton.addEventListener('click', () => {
  openModal(addCustomerModal);
});

closeAddModalButton.addEventListener('click', () => {
  closeModal(addCustomerModal);
});
