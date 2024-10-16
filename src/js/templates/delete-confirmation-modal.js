import { API_BASE_URL } from '../constants/api';
import { del } from '../utils/http-request';
import state from '../constants/state';
import { openModal, closeModal } from '../utils/modal';
import { removeTableRow } from './dashboard';

function createDeleteConfirmationModal() {
  const deleteConfirmationModal = document.querySelector('.delete-confirmation-modal');
  const warningMessage = document.createElement('p');
  warningMessage.textContent = 'Are you sure you want to delete this customer?';
  const buttonGroup = document.createElement('div');
  buttonGroup.classList.add('button-group');
  const confirmButton = document.createElement('button');
  confirmButton.classList.add('button-primary', 'confirm-button');
  confirmButton.textContent = 'Delete';
  const closeButton = document.createElement('button');
  closeButton.classList.add('button-secondary', 'close-button');
  closeButton.textContent = 'Close';
  buttonGroup.append(confirmButton, closeButton);
  deleteConfirmationModal.append(warningMessage, buttonGroup);
}

function closeDeleteConfirmationModal() {
  const deleteConfirmationModal = document.querySelector('.delete-confirmation-modal');
  closeModal(deleteConfirmationModal);
}

async function removeCustomer(event) {
  const { target } = event;
  target.disabled = true;
  await del(`${API_BASE_URL}/${state.currentCustomer.id}`);
  removeTableRow(state.currentCustomer.id);
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

export { createDeleteConfirmationModal, createAndOpenDeleteConfirmationModal };
