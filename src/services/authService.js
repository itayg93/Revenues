import authApi from '../api/authApi';
import profileApi from '../api/profileApi';

// login with email and password
const handleLoginWithEmailAndPassword = async (email, password) => {
  try {
    let response = await authApi.loginWithEmailAndPassword(email, password);
    return {
      isSuccess: true,
      data: response.user,
    };
  } catch (err) {
    return {
      isSuccess: false,
      error: err.message,
    };
  }
};

// login with google
const handleLoginWithGoogle = async () => {
  try {
    let response = await authApi.loginWithGoogle();
    // check if its a new user
    if (response.additionalUserInfo.isNewUser) {
      // create default user profile
      await profileApi.createDefaultUserProfile(response.user.uid);
    }
    return {
      isSuccess: true,
      data: response.user,
    };
  } catch (err) {
    // delete the new user without default profile
    await authApi.deleteCurrentUser();
    return {
      isSuccess: false,
      error: err.message,
    };
  }
};

// get current user
handleGetCurrentUser = () => {
  try {
    let response = authApi.getCurrentUser();
    return {
      isSuccess: true,
      data: response,
    };
  } catch (err) {
    return {
      isSuccess: false,
      error: err.message,
    };
  }
};

// register
const handleRegisterWithEmailAndPassword = async (name, email, password) => {
  try {
    let response = await authApi.registerWithEmailAndPassword(email, password);
    // update name
    await response.user.updateProfile({
      displayName: name,
    });
    // get the updated profile
    let updatedUser = authApi.getCurrentUser();
    // create default user profile
    await profileApi.createDefaultUserProfile(updatedUser.uid);
    return {
      isSuccess: true,
      data: updatedUser,
    };
  } catch (err) {
    // delete the new user without name/default profile
    await authApi.deleteCurrentUser();
    return {
      isSuccess: false,
      error: err.message,
    };
  }
};

// logout
const handleLogoutCurrentUser = async () => {
  try {
    await authApi.logoutCurrentUser();
    return {
      isSuccess: true,
    };
  } catch (err) {
    return {
      isSuccess: false,
      error: err.message,
    };
  }
};

export default {
  handleLoginWithEmailAndPassword,
  handleLoginWithGoogle,
  handleGetCurrentUser,
  handleRegisterWithEmailAndPassword,
  handleLogoutCurrentUser,
};
