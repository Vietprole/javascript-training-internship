import viewIcon from '../../assets/icons/view-icon.svg';
import editIcon from '../../assets/icons/edit-icon.svg';
import deleteIcon from '../../assets/icons/delete-icon.svg';
import { createCustomerModal, fillEditModal } from './customer-modal';
import { viewCustomer } from './view-modal';
import { createAndOpenDeleteConfirmationModal } from './delete-confirmation-modal';
import { capitalizeFirstLetter } from '../utils/helpers';

function createActionMenuButton(type, iconSrc) {
  const button = document.createElement('button');
  button.setAttribute('type', 'button');
  // Add the class based on the type, e.g: view-button, edit-button, delete-button
  button.classList.add(`${type}-button`);
  // Button text has the class button-text and the type, e.g: button-text view
  const buttonText = document.createElement('div');
  buttonText.classList.add('button-text', `${type}`);
  // Text content is the capitalized type, e.g: View, Edit, Delete
  buttonText.textContent = capitalizeFirstLetter(type);
  // Create the icon for the button
  const iconWrapper = document.createElement('div');
  iconWrapper.classList.add('icon-wrapper');
  const img = document.createElement('img');
  img.src = iconSrc;
  img.alt = `${capitalizeFirstLetter(type)} + icon`;
  iconWrapper.appendChild(img);
  button.append(buttonText, iconWrapper);
  return button;
}

function createActionMenu() {
  // Select the empty container for the action menu
  const actionMenu = document.querySelector('.action-menu');
  // If there is already an action menu, delete it
  // This is to prevent duplicate action menus
  while (actionMenu.firstChild) {
    actionMenu.removeChild(actionMenu.firstChild);
  }

  // Create the view button
  const viewButton = createActionMenuButton('view', viewIcon);
  // Create the edit button
  const editButton = createActionMenuButton('edit', editIcon);
  // Create the delete button
  const deleteButton = createActionMenuButton('delete', deleteIcon);
  // Add event listener to the buttons
  viewButton.addEventListener('click', viewCustomer);
  editButton.addEventListener('click', fillEditModal);
  deleteButton.addEventListener('click', createAndOpenDeleteConfirmationModal);

  // Append buttons to the main container
  actionMenu.append(viewButton, editButton, deleteButton);
}

export default createActionMenu;
