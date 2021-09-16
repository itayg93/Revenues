import firestore from '@react-native-firebase/firestore';

const USERS_DATA = 'USERS_DATA';
const PROFILE = 'PROFILE';
const USER_PROFILE = 'USER_PROFILE';

const DEFAULT_USER_PROFILE = {
  taxPoints: 0,
  commissionRate: 0,
  compulsoryInsurance: 0,
  collateralInsurance: 0,
  personalInsurance: 0,
  timestamp: Date.now(),
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

export default {
  createDefaultUserProfile,
};
