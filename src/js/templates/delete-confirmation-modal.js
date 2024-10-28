import { API_BASE_URL } from '../constants/api';
import { deleteData } from '../utils/http-request';
import state from '../constants/state';
import { openModal, closeModal } from '../utils/modal';
import { removeTableRow } from './dashboard';
import { showLoader, hideLoader } from '../utils/loader';

// Function to create the delete confirmation modal
function createDeleteConfirmationModal() {
  const deleteConfirmationModal = document.querySelector('.delete-confirmation-modal');

  // Create and set the warning message
  const warningMessage = document.createElement('p');
  warningMessage.textContent = 'Are you sure you want to delete this customer?';

  // Create a container for the buttons
  const buttonGroup = document.createElement('div');
  buttonGroup.classList.add('button-group');

  // Create and set the confirm button
  const confirmButton = document.createElement('button');
  confirmButton.classList.add('button-primary', 'confirm-button');
  confirmButton.textContent = 'Delete';

  // Create and set the close button
  const closeButton = document.createElement('button');
  closeButton.classList.add('button-secondary', 'close-button');
  closeButton.textContent = 'Close';

  // Append buttons to the button group and then to the modal
  buttonGroup.append(confirmButton, closeButton);
  deleteConfirmationModal.append(warningMessage, buttonGroup);
}

// Function to close the delete confirmation modal
function closeDeleteConfirmationModal() {
  const deleteConfirmationModal = document.querySelector('.delete-confirmation-modal');
  closeModal(deleteConfirmationModal);
}

// Function to handle the customer deletion process
async function removeCustomer(event) {
  const { target } = event;
  target.disabled = true; // Disable the button to prevent multiple clicks

  // Close the delete confirmation modal
  closeDeleteConfirmationModal();

  // Show the loader
  showLoader();

  // Send delete request to the server
  await deleteData(`${API_BASE_URL}/${state.currentCustomer.id}`);

  // Remove the customer row from the table
  removeTableRow(state.currentCustomer.id);

  // Hide the loader
  hideLoader();
}

// Function to create and open the delete confirmation modal
function createAndOpenDeleteConfirmationModal() {
  createDeleteConfirmationModal();

  const deleteConfirmationModal = document.querySelector('.delete-confirmation-modal');
  const deleteConfirmButton = document.querySelector('.delete-confirmation-modal .confirm-button');
  const deleteCloseButton = document.querySelector('.delete-confirmation-modal .close-button');

  // Add event listener to close button
  deleteCloseButton.addEventListener('click', closeDeleteConfirmationModal);

  // Add event listener to confirm button
  deleteConfirmButton.addEventListener('click', removeCustomer);

  // Open the modal
  openModal(deleteConfirmationModal);
}

export { createDeleteConfirmationModal, createAndOpenDeleteConfirmationModal };
