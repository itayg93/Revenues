import auth from '@react-native-firebase/auth';

// login
const loginWithEmailAndPassword = (email, password) => {
  return auth().signInWithEmailAndPassword(email, password);
};

// get current user
const getCurrentUser = () => {
  return auth().currentUser;
};

// register
const registerWithEmailAndPassword = (email, password) => {
  return auth().createUserWithEmailAndPassword(email, password);
};

// logout
const logoutCurrentUser = () => {
  return auth().signOut();
};

// delete
const deleteCurrentUser = () => {
  return getCurrentUser().delete();
};

export default {
  loginWithEmailAndPassword,
  getCurrentUser,
  registerWithEmailAndPassword,
  logoutCurrentUser,
  deleteCurrentUser,
};
