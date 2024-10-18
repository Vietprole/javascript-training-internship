import sortingStates from '../constants/sort';
import REGEX from '../constants/regex';

// Function to check for numbers
function hasNumbers(value) {
  return REGEX.HAS_NUMBER.test(value);
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
function isValid(input, allowNegative = false) {
  if (!allowNegative) {
    // Positive, max 7 digits, max 2 decimal places, allow trailing decimal point
    return REGEX.POSITIVE_VALID.test(input);
  }
  // Allow negative
  return REGEX.NEGATIVE_VALID.test(input);
}

// Adjust input to the correct format
function sanitizeInput(value) {
  if (value.endsWith('-')) {
    return '0.00';
  }
  return Number(value).toFixed(2);
}

// Format number to include commas as thousand separators
function formatNumberWithCommas(number) {
  // Use Intl.NumberFormat to format the number with commas
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
  }).format(number);
}

// Show error message if the required field is empty
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
function sortCustomersByName(customers, currentSortingState) {
  const sortFunctions = {
    [sortingStates.ASC]: () => customers.sort((a, b) => a.name.localeCompare(b.name)),
    [sortingStates.DESC]: () => customers.sort((a, b) => b.name.localeCompare(a.name)),
    [sortingStates.DEFAULT]: () => customers,
  };
  return sortFunctions[currentSortingState]();
}

// Add/Edit form validation
function checkFormValidity() {
  const confirmButton = document.querySelector('.confirm-button');
  const nameInput = document.getElementById('name-input');
  const rateInput = document.getElementById('rate-input');
  const balanceInput = document.getElementById('balance-input');
  const depositInput = document.getElementById('deposit-input');
  const isFormValid =
    nameInput.value.trim() && rateInput.value && balanceInput.value && depositInput.value;
  confirmButton.disabled = !isFormValid;
}

export {
  hasNumbers,
  enforceMaxLength,
  isValid,
  sanitizeInput,
  formatNumberWithCommas,
  showErrorIfEmpty,
  combineAndRemoveDuplicates,
  getActionMenuPosition,
  sortCustomersByName,
  checkFormValidity,
};
