import viewIcon from '../../assets/icons/view-icon.svg';
import editIcon from '../../assets/icons/edit-icon.svg';
import deleteIcon from '../../assets/icons/delete-icon.svg';
import { createCustomerModal, fillEditModal } from './customer-modal';
import { viewCustomer } from './view-modal';
import { createAndOpenDeleteConfirmationModal } from './delete-confirmation-modal';

function createActionMenu() {
  const actionMenu = document.querySelector('.action-menu');

  // Create the view button
  const viewButton = document.createElement('div');
  viewButton.classList.add('view-button');
  const viewButtonText = document.createElement('div');
  viewButtonText.classList.add('button-text');
  viewButtonText.textContent = 'View';
  const viewIconWrapper = document.createElement('div');
  viewIconWrapper.classList.add('icon-wrapper');
  const viewImg = document.createElement('img');
  viewImg.src = viewIcon;
  viewImg.alt = 'View icon';
  viewIconWrapper.appendChild(viewImg);
  viewButton.append(viewButtonText, viewIconWrapper);

  // Create the edit button
  const editButton = document.createElement('div');
  editButton.classList.add('edit-button');
  const editButtonText = document.createElement('div');
  editButtonText.classList.add('button-text');
  editButtonText.textContent = 'Edit';
  const editIconWrapper = document.createElement('div');
  editIconWrapper.classList.add('icon-wrapper');
  const editImg = document.createElement('img');
  editImg.src = editIcon;
  editImg.alt = 'Edit icon';
  editIconWrapper.appendChild(editImg);
  editButton.append(editButtonText, editIconWrapper);

  // Create the delete button
  const deleteButton = document.createElement('div');
  deleteButton.classList.add('delete-button');
  const deleteButtonText = document.createElement('div');
  deleteButtonText.classList.add('button-text', 'delete');
  deleteButtonText.textContent = 'Delete';
  const deleteIconWrapper = document.createElement('div');
  deleteIconWrapper.classList.add('icon-wrapper');
  const deleteImg = document.createElement('img');
  deleteImg.src = deleteIcon;
  deleteImg.alt = 'Delete icon';
  deleteIconWrapper.appendChild(deleteImg);
  deleteButton.append(deleteButtonText, deleteIconWrapper);

  // Append buttons to the main container
  actionMenu.append(viewButton, editButton, deleteButton);
  viewButton.addEventListener('click', viewCustomer);
  editButton.addEventListener('click', fillEditModal);
  deleteButton.addEventListener('click', createAndOpenDeleteConfirmationModal);
}

export default createActionMenu;
