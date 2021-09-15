import auth from '@react-native-firebase/auth';

// login
const loginWithEmailAndPassword = (email, password) => {
  return auth().signInWithEmailAndPassword(email, password);
};

// register
const registerWithEmailAndPassword = (email, password) => {
  return auth().createUserWithEmailAndPassword(email, password);
};

// logout
const logout = () => {
  return auth().signOut();
};

export default {
  loginWithEmailAndPassword,
  registerWithEmailAndPassword,
  logout,
};
