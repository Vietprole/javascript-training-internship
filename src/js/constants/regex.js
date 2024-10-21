const REGEX = {
  HAS_NUMBER: /\d/, // Check for numbers
  POSITIVE_VALID: /^\d{1,7}(\.\d{0,2})?$/, // Positive, max 7 digits, max 2 decimal places, allow trailing decimal point
  NEGATIVE_VALID: /^(-\d{0,7}(\.\d{0,2})?|\d{1,7}(\.\d{0,2})?)$/, // Allow negative
};

export default REGEX;
