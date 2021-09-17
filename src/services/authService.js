import authApi from '../api/authApi';
import profileService from './profileService';

// login with email and password
const handleLoginWithEmailAndPassword = async (email, password) => {
  try {
    // user
    const authResponse = await authApi.loginWithEmailAndPassword(
      email,
      password,
    );
    // user profile
    const profileResponse = await profileService.handleGetCurrentUserProfile(
      authResponse.user.uid,
    );
    // user profile error
    if (!profileResponse.isSuccess) return handleError(profileResponse.error);
    // success
    return handleSuccess({
      user: authResponse.user,
      userProfile: profileResponse.data,
    });
  } catch (err) {
    return handleError(err.message);
  }
};

// login with google
const handleLoginWithGoogle = async () => {
  try {
    // user
    const authResponse = await authApi.loginWithGoogle();
    // check if its a new user
    if (authResponse.additionalUserInfo.isNewUser) {
      // create default user profile
      const createProfileResponse =
        await profileService.handleCreateDefaultUserProfile(
          authResponse.user.uid,
        );
      // create default user profile error
      if (!createProfileResponse.isSuccess)
        return handleError(createProfileResponse.error);
      // create default user profile success
      return handleSuccess({
        user: authResponse.user,
        userProfile: profileService.handleGetDefaultUserProfile(),
      });
    }
    const getProfileResponse = await profileService.handleGetCurrentUserProfile(
      authResponse.user.uid,
    );
    // get user profile error
    if (!getProfileResponse.isSuccess)
      return handleError(getProfileResponse.error);
    // get user profile success
    return handleSuccess({
      user: authResponse.user,
      userProfile: getProfileResponse.data,
    });
  } catch (err) {
    // TODO: delete the new user if error occured when create default profile
    return handleError(err.message);
  }
};

// get current user and user profile
handleGetCurrentUserAndUserProfile = async () => {
  try {
    // user
    const authResponse = authApi.getCurrentUser();
    if (!authResponse) return null;
    // user profile
    const profileResponse = await profileService.handleGetCurrentUserProfile(
      authResponse.uid,
    );
    // get user profile error
    if (!profileResponse.isSuccess) return handleError(profileResponse.error);
    // success
    return handleSuccess({
      user: authResponse,
      userProfile: profileResponse.data,
    });
  } catch (err) {
    return handleError(err.message);
  }
};

// register
const handleRegisterWithEmailAndPassword = async (name, email, password) => {
  try {
    const authResponse = await authApi.registerWithEmailAndPassword(
      email,
      password,
    );
    // FIXME:
    // update name
    await authResponse.user.updateProfile({
      displayName: name,
    });
    // get the updated profile
    const updatedUser = authApi.getCurrentUser();
    // create default user profile
    const createProfileResponse =
      await profileService.handleCreateDefaultUserProfile(updatedUser.uid);
    // create default user profile error
    if (!createProfileResponse.isSuccess)
      return handleError(createProfileResponse.error);
    // create default user profile success
    return handleSuccess({
      user: updatedUser,
      userProfile: profileService.handleGetDefaultUserProfile(),
    });
  } catch (err) {
    // TODO: delete the new user if error occured when update the name or create default profile
    return handleError(err.message);
  }
};

// logout
const handleLogoutCurrentUser = async () => {
  try {
    await authApi.logoutCurrentUser();
    return handleSuccess();
  } catch (err) {
    return handleError(err.message);
  }
};

// handle error
const handleError = error => {
  return {
    isSuccess: false,
    error,
  };
};

// handle success
const handleSuccess = (data = {}) => {
  return {
    isSuccess: true,
    data,
  };
};

export default {
  handleLoginWithEmailAndPassword,
  handleLoginWithGoogle,
  handleGetCurrentUserAndUserProfile,
  handleRegisterWithEmailAndPassword,
  handleLogoutCurrentUser,
};
