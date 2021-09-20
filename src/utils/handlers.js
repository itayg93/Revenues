import {Alert} from 'react-native';

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

// show alert
const handleShowAlert = (title, alertMessage) => {
  Alert.alert(title, alertMessage);
};

export default {
  handleError,
  handleSuccess,
  handleShowAlert,
};
