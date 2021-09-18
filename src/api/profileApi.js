import firestore from '@react-native-firebase/firestore';

const USERS_DATA = 'USERS_DATA';
const PROFILE = 'PROFILE';
const USER_PROFILE = 'USER_PROFILE';

const DEFAULT_USER_PROFILE = {
  taxPoints: 2.25,
  commissionRate: 5,
  compulsoryInsurance: 0,
  collateralInsurance: 0,
  timestamp: Date.now(),
};

// get default user profile
const getDefaultUserProfile = () => {
  return DEFAULT_USER_PROFILE;
};

// create default user profile
const createDefaultUserProfile = userId => {
  return firestore()
    .collection(USERS_DATA)
    .doc(userId)
    .collection(PROFILE)
    .doc(USER_PROFILE)
    .set(DEFAULT_USER_PROFILE);
};

// get current user profile
const getCurrentUserProfile = userId => {
  return firestore()
    .collection(USERS_DATA)
    .doc(userId)
    .collection(PROFILE)
    .doc(USER_PROFILE)
    .get();
};

export default {
  getDefaultUserProfile,
  createDefaultUserProfile,
  getCurrentUserProfile,
};
