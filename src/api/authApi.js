import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
  webClientId:
    '675544407702-rq3ql0uaevs6vu2eic23vejqohg2aa9m.apps.googleusercontent.com',
});

// login with email and password
const loginWithEmailAndPassword = (email, password) => {
  return auth().signInWithEmailAndPassword(email, password);
};

// login with google
const loginWithGoogle = async () => {
  const {idToken} = await GoogleSignin.signIn();
  const googleCredential = auth.GoogleAuthProvider.credential(idToken);
  return auth().signInWithCredential(googleCredential);
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
  loginWithGoogle,
  getCurrentUser,
  registerWithEmailAndPassword,
  logoutCurrentUser,
  deleteCurrentUser,
};
