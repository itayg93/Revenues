import firestore from '@react-native-firebase/firestore';

import constants from '../utils/constants';

// submit expense
const submitExpense = (userId, values) => {
  return firestore()
    .collection(constants.USERS_DATA)
    .doc(userId)
    .collection(constants.EXPENSES)
    .doc(new Date(parseInt(values.time.timestamp, 10)).toString())
    .set(values);
};

// get expense by month
const getExpenseByMonth = (userId, month) => {
  return firestore()
    .collection(constants.USERS_DATA)
    .doc(userId)
    .collection(constants.EXPENSES)
    .where('time.month', '==', month)
    .get();
};

export default {
  submitExpense,
  getExpenseByMonth,
};
