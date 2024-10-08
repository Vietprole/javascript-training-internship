function createViewCustomerModal(customer) {
  const viewCustomerModal = document.querySelector('.view-customer-modal');

  const heading = document.createElement('h2');
  heading.textContent = 'View Customer';
  const horizontalRule = document.createElement('hr');
  const viewCustomerWrapper = document.createElement('div');
  viewCustomerWrapper.classList.add('view-customer-wrapper');

  const nameField = document.createElement('div');
  nameField.classList.add('name-field');
  const nameLabel = document.createElement('div');
  nameLabel.classList.add('label');
  nameLabel.textContent = 'Name';
  const nameContent = document.createElement('div');
  nameContent.classList.add('name-content');
  nameContent.setAttribute('id', 'name-content');
  nameContent.textContent = customer.name;
  nameField.append(nameLabel, nameContent);

  const statusField = document.createElement('div');
  statusField.classList.add('status-field');
  const statusLabel = document.createElement('div');
  statusLabel.classList.add('label');
  statusLabel.textContent = 'Status';
  const statusContent = document.createElement('div');
  statusContent.classList.add('status-cell', `status-${customer.status.toLowerCase()}`);
  statusContent.setAttribute('id', 'status-content');
  statusContent.textContent = customer.status;
  statusField.append(statusLabel, statusContent);

  // Create a reusable dollar sign element
  const dollarSign = document.createElement('span');
  dollarSign.textContent = '$';

  const rateField = document.createElement('div');
  rateField.classList.add('rate-field');
  const rateLabel = document.createElement('div');
  rateLabel.classList.add('label');
  rateLabel.textContent = 'Rate';
  const rateContent = document.createElement('div');
  rateContent.classList.add('rate-content');
  rateContent.setAttribute('id', 'rate-content');
  const rateDollarSign = dollarSign.cloneNode(true); // Clone the dollar sign element
  const rate = document.createElement('span');
  rate.textContent = customer.rate;
  rateContent.append(rateDollarSign, rate);
  rateField.append(rateLabel, rateContent);

  const balanceField = document.createElement('div');
  balanceField.classList.add('balance-field');
  const balanceLabel = document.createElement('div');
  balanceLabel.classList.add('label');
  balanceLabel.textContent = 'Balance';
  const balanceContent = document.createElement('div');
  balanceContent.classList.add('balance-content');
  balanceContent.setAttribute('id', 'balance-content');
  const balanceDollarSign = dollarSign.cloneNode(true); // Clone the dollar sign element
  const balance = document.createElement('span');
  balance.textContent = customer.balance;
  if (customer.balance < 0) {
    balanceDollarSign.textContent = '-$';
    balance.textContent = Math.abs(customer.balance);
    balanceContent.classList.remove('positive');
    balanceContent.classList.add('negative');
  }
  balanceContent.append(balanceDollarSign, balance);
  balanceField.append(balanceLabel, balanceContent);

  const depositField = document.createElement('div');
  depositField.classList.add('deposit-field');
  const depositLabel = document.createElement('div');
  depositLabel.classList.add('label');
  depositLabel.textContent = 'Deposit';
  const depositContent = document.createElement('div');
  depositContent.classList.add('deposit-content');
  depositContent.setAttribute('id', 'deposit-content');
  const depositDollarSign = dollarSign.cloneNode(true); // Clone the dollar sign element
  const deposit = document.createElement('span');
  deposit.textContent = customer.deposit;
  depositContent.append(depositDollarSign, deposit);
  depositField.append(depositLabel, depositContent);

  const descriptionField = document.createElement('div');
  descriptionField.classList.add('description-field');
  const descriptionLabel = document.createElement('div');
  descriptionLabel.classList.add('label');
  descriptionLabel.textContent = 'Description';
  const descriptionContent = document.createElement('div');
  descriptionContent.classList.add('description-content');
  descriptionContent.setAttribute('id', 'description-content');
  descriptionContent.textContent = customer.description;
  descriptionField.append(descriptionLabel, descriptionContent);

  const buttonGroup = document.createElement('div');
  buttonGroup.classList.add('button-group');
  const closeButton = document.createElement('button');
  closeButton.classList.add('button-secondary', 'close-button');
  closeButton.textContent = 'Close';
  buttonGroup.append(closeButton);

  viewCustomerWrapper.append(
    nameField,
    statusField,
    rateField,
    balanceField,
    depositField,
    descriptionField
  );
  viewCustomerModal.append(heading, horizontalRule, viewCustomerWrapper, buttonGroup);
}

export default createViewCustomerModal;
