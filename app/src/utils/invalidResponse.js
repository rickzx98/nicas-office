
const INVALID_INDICATOR = 'order validation failed';
export const GetValidationError = (error) => {
  if (error && error.message && error.message.indexOf(INVALID_INDICATOR) > -1) {
    const splitError = error.message.split(':');
    return Object.assign({}, { isErrorField: true, field: splitError[1].trim(), message: splitError[2].trim() });
  } else {
    return error;
  }
};
