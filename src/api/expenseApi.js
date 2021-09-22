import firestore from '@react-native-firebase/firestore';

import constants from '../utils/constants';

// submit expense
const submitExpense = (userId, values) => {
  return (
    firestore()
      .collection(constants.USERS_DATA)
      .doc(userId)
      .collection(constants.EXPENSES)
      //FIXME:
      .doc(new Date(parseInt(values.timestamp, 10)).toString())
      .set(values)
  );
};

export default {
  submitExpense,
};
