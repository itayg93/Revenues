import authApi from '../api/authApi';

// login
const handleLoginWithEmailAndPassword = async (email, password) => {
  try {
    await authApi.loginWithEmailAndPassword(email, password);
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

// register
const handleRegisterWithEmailAndPassword = async (name, email, password) => {
  try {
    let response = await authApi.registerWithEmailAndPassword(email, password);
    // update name
    await response.user.updateProfile({
      displayName: name,
    });
    // TODO:
    // create default profile
  } catch (err) {
    return {
      isSuccess: false,
      error: err.message,
    };
  }
};

// logout
const handleLogout = async () => {
  try {
    await authApi.logout();
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
  handleRegisterWithEmailAndPassword,
  handleLogout,
};
