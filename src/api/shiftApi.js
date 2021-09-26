import firestore from '@react-native-firebase/firestore';

import constants from '../utils/constants';

// submit shift
const submitShift = (userId, values) => {
  return firestore()
    .collection(constants.USERS_DATA)
    .doc(userId)
    .collection(constants.SHIFTS)
    .doc(new Date(parseInt(values.time.timestamp, 10)).toString())
    .set(values);
};

export default {
  submitShift,
};
