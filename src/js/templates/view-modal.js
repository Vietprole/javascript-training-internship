//* Fill view modal with customer data
function fillViewModal(customer) {
  const nameContent = document.getElementById('name-content');
  const statusContent = document.getElementById('status-content');
  const rateContent = document.getElementById('rate-content');
  const balanceContent = document.getElementById('balance-content');
  const depositContent = document.getElementById('deposit-content');
  const descriptionContent = document.getElementById('description-content');

  nameContent.textContent = customer.name;
  const { status } = customer;
  // Remove all classes except 'status-cell'
  statusContent.classList.forEach((className) => {
    if (className !== 'status-cell') {
      statusContent.classList.remove(className);
    }
  });
  // Add class based on status
  statusContent.classList.add(`status-${status.toLowerCase()}`);
  statusContent.textContent = customer.status;

  // Create a reusable dollar sign element
  const dollarSign = document.createElement('span');
  dollarSign.textContent = '$';

  const rateDollarSign = dollarSign.cloneNode(true); // Clone the dollar sign element
  const rate = document.createElement('span');
  rate.textContent = customer.rate;
  rateContent.appendChild(rateDollarSign);
  rateContent.appendChild(rate);

  balanceContent.classList.add('positive');
  const balanceDollarSign = dollarSign.cloneNode(true); // Clone the dollar sign element
  const balance = document.createElement('span');
  balance.textContent = customer.balance;
  if (customer.balance < 0) {
    balanceDollarSign.textContent = '-$';
    balance.textContent = Math.abs(customer.balance);
    balanceContent.classList.remove('positive');
    balanceContent.classList.add('negative');
  }
  balanceContent.appendChild(balanceDollarSign);
  balanceContent.appendChild(balance);

  const depositDollarSign = dollarSign.cloneNode(true); // Clone the dollar sign element
  const deposit = document.createElement('span');
  deposit.textContent = customer.deposit;
  depositContent.appendChild(depositDollarSign);
  depositContent.appendChild(deposit);

  descriptionContent.textContent = customer.description;
}

export default fillViewModal;
