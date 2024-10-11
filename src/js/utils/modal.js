// Open and close modal functions
function openModal(modal) {
  const modalElement = modal;
  const modalOverlay = document.querySelector('.modal-overlay');
  modalElement.classList.add('open'); // Show the modal
  modalOverlay.classList.add('open'); // Show the overlay
}

function closeModal(modal) {
  const modalElement = modal;
  const modalOverlay = document.querySelector('.modal-overlay');
  modalElement.classList.remove('open'); // Hide the modal
  while (modalElement.firstChild) {
    modalElement.removeChild(modalElement.firstChild);
  }

  modalOverlay.classList.remove('open'); // Hide the overlay
}

export { openModal, closeModal };
