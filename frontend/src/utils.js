function formatDate(date) {
  return new Intl.DateTimeFormat(localStorage.getItem('lang') || 'en-gb', {
    dateStyle: 'short',
    timeStyle: 'short',
  }).format(new Date(date));
}

const validateLength = (val, minLength, msg) => (val && val.length > minLength) || msg;

const validateRange = (val, minVal, maxVal, msg) => {
  if ((val && val < minVal) || (val && val > maxVal)) {
    return `${msg}${minVal}-${maxVal}`;
  }
};

const regexKey = /^[a-z-0-9\_\-]+$/;
const validateKey = (val, msg) => (regexKey.test(val) ? true : msg);

export { formatDate, validateLength, validateKey, validateRange };
