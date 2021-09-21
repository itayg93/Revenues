import firestore from '@react-native-firebase/firestore';

import constants from '../utils/constants';

// get default user profile
const getDefaultUserProfile = () => {
  return constants.DEFAULT_USER_PROFILE;
};

// create default user profile
const createDefaultUserProfile = userId => {
  return firestore()
    .collection(constants.USERS_DATA)
    .doc(userId)
    .collection(constants.PROFILE)
    .doc(constants.USER_PROFILE)
    .set(constants.DEFAULT_USER_PROFILE);
};

// get current user profile
const getCurrentUserProfile = userId => {
  return firestore()
    .collection(constants.USERS_DATA)
    .doc(userId)
    .collection(constants.PROFILE)
    .doc(constants.USER_PROFILE)
    .get();
};

// update current user profile
const updateCurrentUserProfile = (userId, values) => {
  return firestore()
    .collection(constants.USERS_DATA)
    .doc(userId)
    .collection(constants.PROFILE)
    .doc(constants.USER_PROFILE)
    .update(values);
};

export default {
  getDefaultUserProfile,
  createDefaultUserProfile,
  getCurrentUserProfile,
  updateCurrentUserProfile,
};
