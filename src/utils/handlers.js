import {Alert} from 'react-native';
import constants from './constants';

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

// handle error alert
const handleErrorAlert = alert => {
  Alert.alert(constants.ERROR, alert);
};

// handle success alert
const handleSuccessAlert = alert => {
  Alert.alert(constants.SUCCESS, alert);
};

export default {
  handleError,
  handleSuccess,
  handleErrorAlert,
  handleSuccessAlert,
};
