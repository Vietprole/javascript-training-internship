import state from '../constants/state';
import { closeModal, openModal } from '../utils/modal';
import { formatNumberWithCommas } from '../utils/helpers';

function createSymbolSpan(symbol) {
  const symbolSpan = document.createElement('span');
  symbolSpan.textContent = symbol;
  return symbolSpan;
}

function createNameField(name) {
  const nameField = document.createElement('p');
  nameField.classList.add('name-field');
  const nameLabel = document.createElement('p');
  nameLabel.classList.add('label');
  nameLabel.textContent = 'Name';
  const nameContent = document.createElement('p');
  nameContent.classList.add('name-content');
  nameContent.setAttribute('id', 'name-content');
  nameContent.textContent = name;
  nameField.append(nameLabel, nameContent);
  return nameField;
}

function createStatusField(status) {
  const statusField = document.createElement('p');
  statusField.classList.add('status-field');
  const statusLabel = document.createElement('p');
  statusLabel.classList.add('label');
  statusLabel.textContent = 'Status';
  const statusContent = document.createElement('p');
  statusContent.classList.add('status-cell', `status-${status.toLowerCase()}`);
  statusContent.setAttribute('id', 'status-content');
  statusContent.textContent = status;
  statusField.append(statusLabel, statusContent);
  return statusField;
}

function createRateField(rate, symbol) {
  const rateField = document.createElement('p');
  rateField.classList.add('rate-field');
  const rateLabel = document.createElement('p');
  rateLabel.classList.add('label');
  rateLabel.textContent = 'Rate';
  const rateContent = document.createElement('p');
  rateContent.classList.add('rate-content');
  rateContent.setAttribute('id', 'rate-content');
  const rateSymbol = createSymbolSpan(symbol);
  const rateSpan = document.createElement('span');
  rateSpan.textContent = formatNumberWithCommas(rate);
  rateContent.append(rateSymbol, rateSpan);
  rateField.append(rateLabel, rateContent);
  return rateField;
}

function createBalanceField(balance, symbol) {
  const balanceField = document.createElement('p');
  balanceField.classList.add('balance-field');
  const balanceLabel = document.createElement('p');
  balanceLabel.classList.add('label');
  balanceLabel.textContent = 'Balance';
  const balanceContent = document.createElement('p');
  balanceContent.classList.add('balance-content');
  balanceContent.setAttribute('id', 'balance-content');
  const balanceSymbol = createSymbolSpan(symbol);
  const balanceSpan = document.createElement('span');
  balanceSpan.textContent = formatNumberWithCommas(balance);
  balanceContent.classList.add('positive');
  if (balance < 0) {
    balanceSymbol.textContent = `-${symbol}`;
    balanceSpan.textContent = formatNumberWithCommas(Math.abs(balance).toString());
    balanceContent.classList.remove('positive');
    balanceContent.classList.add('negative');
  }
  balanceContent.append(balanceSymbol, balanceSpan);
  balanceField.append(balanceLabel, balanceContent);
  return balanceField;
}

function createDepositField(deposit, symbol) {
  const depositField = document.createElement('p');
  depositField.classList.add('deposit-field');
  const depositLabel = document.createElement('p');
  depositLabel.classList.add('label');
  depositLabel.textContent = 'Deposit';
  const depositContent = document.createElement('p');
  depositContent.classList.add('deposit-content');
  depositContent.setAttribute('id', 'deposit-content');
  const depositSymbol = createSymbolSpan(symbol);
  const depositSpan = document.createElement('span');
  depositSpan.textContent = formatNumberWithCommas(deposit);
  depositContent.append(depositSymbol, depositSpan);
  depositField.append(depositLabel, depositContent);
  return depositField;
}

function createDescriptionField(description) {
  const descriptionField = document.createElement('p');
  descriptionField.classList.add('description-field');
  const descriptionLabel = document.createElement('p');
  descriptionLabel.classList.add('label');
  descriptionLabel.textContent = 'Description';
  const descriptionWrapper = document.createElement('p');
  descriptionWrapper.classList.add('tooltip');
  const descriptionContent = document.createElement('p');
  descriptionContent.classList.add('description-content');
  descriptionContent.setAttribute('id', 'description-content');
  descriptionContent.textContent = description;
  const tooltip = document.createElement('span');
  tooltip.classList.add('tooltiptext');
  tooltip.textContent = description;
  descriptionWrapper.append(descriptionContent, tooltip);
  descriptionField.append(descriptionLabel, descriptionWrapper);
  return descriptionField;
}

function createButtonGroup() {
  const buttonGroup = document.createElement('div');
  buttonGroup.classList.add('button-group');
  const closeButton = document.createElement('button');
  closeButton.classList.add('button-secondary', 'close-button');
  closeButton.textContent = 'Close';
  buttonGroup.append(closeButton);
  return buttonGroup;
}

function createViewCustomerWrapper(customer) {
  const viewCustomerWrapper = document.createElement('div');
  viewCustomerWrapper.classList.add('view-customer-wrapper');

  // Create the fields for the modal
  const nameField = createNameField(customer.name);
  const statusField = createStatusField(customer.status);
  const rateField = createRateField(customer.rate, customer.symbol);
  const balanceField = createBalanceField(customer.balance, customer.symbol);
  const depositField = createDepositField(customer.deposit, customer.symbol);
  const descriptionField = createDescriptionField(customer.description);

  viewCustomerWrapper.append(
    nameField,
    statusField,
    rateField,
    balanceField,
    depositField,
    descriptionField
  );
  return viewCustomerWrapper;
}

function createViewCustomerModal(customer) {
  const viewCustomerModal = document.querySelector('.view-customer-modal');

  // Create header, horizontal rule for the modal
  const heading = document.createElement('h2');
  heading.textContent = 'View Customer';
  const horizontalRule = document.createElement('hr');

  // Create the wrapper for the customer details
  const viewCustomerWrapper = createViewCustomerWrapper(customer);

  // Create the button group
  const buttonGroup = createButtonGroup();

  viewCustomerModal.append(heading, horizontalRule, viewCustomerWrapper, buttonGroup);
}

// View customer when click on the view button
function viewCustomer() {
  createViewCustomerModal(state.currentCustomer);
  const viewCustomerModal = document.querySelector('.view-customer-modal');
  const closeViewModalButton = viewCustomerModal.querySelector('.close-button');
  closeViewModalButton.addEventListener('click', () => {
    closeModal(viewCustomerModal);
  });
  openModal(viewCustomerModal);
}

export { createViewCustomerModal, viewCustomer };
