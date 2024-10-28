// Open and close modal functions
function openModal(modal) {
  const modalElement = modal;
  const modalOverlay = document.querySelector('.modal-overlay');
  modalElement.classList.add('visible'); // Show the modal
  modalOverlay.classList.add('visible'); // Show the overlay
}

function closeModal(modal) {
  const modalElement = modal;
  const modalOverlay = document.querySelector('.modal-overlay');
  modalElement.classList.remove('visible'); // Hide the modal
  while (modalElement.firstChild) {
    modalElement.removeChild(modalElement.firstChild);
  }

  modalOverlay.classList.remove('visible'); // Hide the overlay
}

export { openModal, closeModal };
