import { openModal, closeModal } from '../utils/modal';
import { showToast, hideToast } from '../utils/toast';

// Function to create the error modal
function createErrorToast(error) {
  const errorToast = document.querySelector('.error-toast');

  // Create and set the error message
  const errorMessage = document.createElement('p');
  errorMessage.textContent = error;

  // Create and set the close button
  const closeButton = document.createElement('button');
  closeButton.classList.add('close-button');
  closeButton.innerHTML = '&times;';

  errorToast.append(errorMessage, closeButton);
}

// Function to close the delete confirmation modal
function closeErrorToast() {
  const errorToast = document.querySelector('.error-toast');
  hideToast(errorToast);
}

// Function to create and open the delete confirmation modal
function createAndOpenErrorToast(error) {
  createErrorToast(error);

  const errorToast = document.querySelector('.error-toast');
  const errorCloseButton = errorToast.querySelector('.close-button');

  // Add event listener to close button
  errorCloseButton.addEventListener('click', closeErrorToast);

  // Show the error toast
  showToast(errorToast);
}

export default createAndOpenErrorToast;
