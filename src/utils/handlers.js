// handle error
const handleError = error => {
  return {
    isSuccess: false,
    error,
  };
};

// handle success
const handleSuccess = (data = {}) => {
  return {
    isSuccess: true,
    data,
  };
};

export default {
  handleError,
  handleSuccess,
};
