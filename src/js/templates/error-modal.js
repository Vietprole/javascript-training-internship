import { openModal, closeModal } from '../utils/modal';

// Function to create the error modal
function createErrorModal(error) {
  const errorModal = document.querySelector('.error-modal');

  // Create and set the warning message
  const errorHeading = document.createElement('h2');
  errorHeading.textContent = 'Error!';

  // Create and set the error details
  const errorDetails = document.createElement('p');
  errorDetails.textContent = error;

  // Create a container for the buttons
  const buttonGroup = document.createElement('div');
  buttonGroup.classList.add('button-group');

  // Create and set the close button
  const closeButton = document.createElement('button');
  closeButton.classList.add('button-secondary', 'close-button');
  closeButton.textContent = 'Close';

  // Append buttons to the button group and then to the modal
  buttonGroup.append(closeButton);
  errorModal.append(errorHeading, errorDetails, buttonGroup);
}

// Function to close the delete confirmation modal
function closeErrorModal() {
  const errorModal = document.querySelector('.error-modal');
  closeModal(errorModal);
}

// Function to create and open the delete confirmation modal
function createAndOpenErrorModal(error) {
  createErrorModal(error);

  const errorModal = document.querySelector('.error-modal');
  const errorCloseButton = document.querySelector('.error-modal .close-button');

  // Add event listener to close button
  errorCloseButton.addEventListener('click', closeErrorModal);

  // Open the modal
  openModal(errorModal);
}

export default createAndOpenErrorModal;
