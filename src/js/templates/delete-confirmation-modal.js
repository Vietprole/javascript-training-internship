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

export default createDeleteConfirmationModal;
