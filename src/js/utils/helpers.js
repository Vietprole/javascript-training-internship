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

function removeTrailingDecimalPoint(value) {
  if (value.endsWith('.')) {
    return value.slice(0, -1);
  }
  return value;
}

function removeTrailingNegativeSign(value) {
  if (value.endsWith('-')) {
    return value.slice(0, -1);
  }
  return value;
}

function showWarningIfEmpty(event) {
  const input = event.target;
  const inputWrapper = input.closest('.input-wrapper');
  const errorMessageDiv = inputWrapper ? inputWrapper.nextElementSibling : null;

  if (!input.value.trim()) {
    inputWrapper.classList.add('warning');
    if (errorMessageDiv) {
      errorMessageDiv.textContent = 'Field is required.';
    }
  } else {
    inputWrapper.classList.remove('warning');
    if (errorMessageDiv) {
      errorMessageDiv.textContent = '';
    }
  }
}

export {
  hasNumbers,
  enforceMaxLength,
  isValid,
  removeTrailingDecimalPoint,
  removeTrailingNegativeSign,
  showWarningIfEmpty,
};
