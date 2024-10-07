// Function to check for numbers
function hasNumbers(value) {
  return /\d/.test(value);
}

// Function to enforce max length
function enforceMaxLength(event) {
  const input = event.target;
  if (input.value.length >= 50) {
    input.value = input.value.slice(0, 50);
    event.preventDefault();
  }
}

// Function to check if the rate, balance, deposit is valid
function isValid(input) {
  // Positive, max 7 digits, max 2 decimal places, allow trailing decimal point
  return /^\d{1,7}(\.\d{0,2})?$/.test(input);
}

function sanitizeInput(value) {
  let temp = value.endsWith('.') ? `${value}00` : value;
  // If the value ends with a single decimal digit, add '0'
  temp = /^-?\d+\.\d$/.test(temp) ? `${temp}0` : temp;
  // If the value not contains "." and end with a digit, add '.00'
  temp = /^-?\d+$/.test(temp) ? `${temp}.00` : temp;
  return temp.endsWith('-') ? '0.00' : temp;
}

function showErrorIfEmpty(event) {
  const input = event.target;
  const inputWrapper = input.closest('.input-wrapper');
  const errorMessageDiv = inputWrapper ? inputWrapper.nextElementSibling : null;

  if (!input.value.trim()) {
    inputWrapper.classList.add('error');
    if (errorMessageDiv) {
      errorMessageDiv.textContent = 'Field is required.';
    }
  } else {
    inputWrapper.classList.remove('error');
    if (errorMessageDiv) {
      errorMessageDiv.textContent = '';
    }
  }
}

// Function to combine the results and remove duplicates
function combineAndRemoveDuplicates(firstArray, secondArray) {
  return [...firstArray, ...secondArray].reduce((acc, item) => {
    if (!acc.some((accItem) => accItem.id === item.id)) {
      acc.push(item);
    }
    return acc;
  }, []); // acc is the accumulator
}

// Get action menu position
function getActionMenuPosition(button) {
  const { top, left } = button.getBoundingClientRect();
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  const scrollLeft = window.scrollX || document.documentElement.scrollLeft;
  return { top: `${top + scrollTop}px`, left: `${left + scrollLeft - 100}px` };
}

// Sort the customers by name
function sortCustomersByName(customers, sortingState) {
  if (sortingState === 'asc') {
    return customers.sort((a, b) => a.name.localeCompare(b.name));
  }
  if (sortingState === 'desc') {
    return customers.sort((a, b) => b.name.localeCompare(a.name));
  }
  return customers;
}

export {
  hasNumbers,
  enforceMaxLength,
  isValid,
  sanitizeInput,
  showErrorIfEmpty,
  combineAndRemoveDuplicates,
  getActionMenuPosition,
  sortCustomersByName,
};
