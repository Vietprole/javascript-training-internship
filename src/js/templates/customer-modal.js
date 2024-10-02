function createCustomerModal(isAddMode) {
  const customerModal = document.querySelector('.customer-modal');

  const heading = document.createElement('h2');
  heading.textContent = isAddMode ? 'Add Customer' : 'Edit Customer';
  const horizontalRule = document.createElement('hr');
  const form = document.createElement('form');
  form.classList.add('modal-form');

  const nameField = document.createElement('div');
  nameField.classList.add('name-field');
  const nameLabel = document.createElement('label');
  nameLabel.setAttribute('for', 'name-input');
  nameLabel.classList.add('label');
  nameLabel.textContent = 'Name';
  const inputWrapper = document.createElement('div');
  inputWrapper.classList.add('input-wrapper');
  const nameInput = document.createElement('input');
  nameInput.setAttribute('type', 'text');
  nameInput.setAttribute('id', 'name-input');
  nameInput.setAttribute('required', 'true');
  inputWrapper.appendChild(nameInput);
  // Reusable error message
  const errorMessage = document.createElement('div');
  errorMessage.classList.add('error-message');
  nameField.append(nameLabel, inputWrapper, errorMessage);

  const statusField = document.createElement('div');
  statusField.classList.add('status-field');
  const statusLabel = document.createElement('label');
  statusLabel.setAttribute('for', 'status-input');
  statusLabel.classList.add('label');
  statusLabel.textContent = 'Status';
  const statusInput = document.createElement('select');
  statusInput.setAttribute('id', 'status-input');
  const openOption = document.createElement('option');
  openOption.setAttribute('value', 'open');
  openOption.textContent = 'Open';
  const paidOption = document.createElement('option');
  paidOption.setAttribute('value', 'paid');
  paidOption.textContent = 'Paid';
  const inactiveOption = document.createElement('option');
  inactiveOption.setAttribute('value', 'inactive');
  inactiveOption.textContent = 'Inactive';
  const dueOption = document.createElement('option');
  dueOption.setAttribute('value', 'due');
  dueOption.textContent = 'Due';
  statusInput.append(openOption, paidOption, inactiveOption, dueOption);
  statusField.append(statusLabel, statusInput);

  // Reusable dollar sign
  const dollarSign = document.createElement('span');
  dollarSign.textContent = '$';

  const rateField = document.createElement('div');
  rateField.classList.add('rate-field');
  const rateLabel = document.createElement('label');
  rateLabel.setAttribute('for', 'rate-input');
  rateLabel.classList.add('label');
  rateLabel.textContent = 'Rate';
  const rateInputWrapper = inputWrapper.cloneNode(false);
  const rateDollarSign = dollarSign.cloneNode(false);
  const rateInput = document.createElement('input');
  rateInput.setAttribute('type', 'text');
  rateInput.setAttribute('id', 'rate-input');
  rateInput.setAttribute('required', 'true');
  rateInputWrapper.append(rateDollarSign, rateInput);
  const rateErrorMessage = errorMessage.cloneNode(false);
  rateField.append(rateLabel, rateInputWrapper, rateErrorMessage);

  const balanceField = document.createElement('div');
  balanceField.classList.add('balance-field');
  const balanceLabel = document.createElement('label');
  balanceLabel.setAttribute('for', 'balance-input');
  balanceLabel.classList.add('label');
  balanceLabel.textContent = 'Balance';
  const balanceInputWrapper = inputWrapper.cloneNode(false);
  const balanceDollarSign = dollarSign.cloneNode(false);
  const balanceInput = document.createElement('input');
  balanceInput.setAttribute('type', 'text');
  balanceInput.setAttribute('id', 'balance-input');
  balanceInput.setAttribute('required', 'true');
  balanceInputWrapper.append(balanceDollarSign, balanceInput);
  const balanceErrorMessage = errorMessage.cloneNode(false);
  balanceField.append(balanceLabel, balanceInputWrapper, balanceErrorMessage);

  const depositField = document.createElement('div');
  depositField.classList.add('deposit-field');
  const depositLabel = document.createElement('label');
  depositLabel.setAttribute('for', 'deposit-input');
  depositLabel.classList.add('label');
  depositLabel.textContent = 'Deposit';
  const depositInputWrapper = inputWrapper.cloneNode(false);
  const depositDollarSign = dollarSign.cloneNode(false);
  const depositInput = document.createElement('input');
  depositInput.setAttribute('type', 'text');
  depositInput.setAttribute('id', 'deposit-input');
  depositInput.setAttribute('required', 'true');
  depositInputWrapper.append(depositDollarSign, depositInput);
  const depositErrorMessage = errorMessage.cloneNode(false);
  depositField.append(depositLabel, depositInputWrapper, depositErrorMessage);

  const descriptionField = document.createElement('div');
  descriptionField.classList.add('description-field');
  const descriptionLabel = document.createElement('label');
  descriptionLabel.setAttribute('for', 'description-input');
  descriptionLabel.classList.add('label');
  descriptionLabel.textContent = 'Description';
  const descriptionInput = document.createElement('textarea');
  descriptionInput.setAttribute('id', 'description-input');
  descriptionField.append(descriptionLabel, descriptionInput);

  const buttonGroup = document.createElement('div');
  buttonGroup.classList.add('button-group');
  const confirmButton = document.createElement('button');
  confirmButton.classList.add('button-primary', 'confirm-button');
  confirmButton.setAttribute('disabled', 'true');
  confirmButton.textContent = isAddMode ? 'Create' : 'Save';
  const closeButton = document.createElement('button');
  closeButton.classList.add('button-secondary', 'close-button');
  closeButton.textContent = 'Close';
  buttonGroup.append(confirmButton, closeButton);

  form.append(nameField, statusField, rateField, balanceField, depositField, descriptionField);
  customerModal.append(heading, horizontalRule, form, buttonGroup);
}

export default createCustomerModal;
