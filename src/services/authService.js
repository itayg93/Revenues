import authApi from '../api/authApi';
import profileService from './profileService';
import handlers from '../utils/handlers';

// login with email and password
const handleLoginWithEmailAndPassword = async (email, password) => {
  try {
    const {user} = await authApi.loginWithEmailAndPassword(email, password);
    // try to get current user profile
    return await handleRequestFromProfileService(
      profileService.handleGetCurrentUserProfile,
      user,
    );
  } catch (err) {
    return handlers.handleError(err.message);
  }
};

// login with google
const handleLoginWithGoogle = async () => {
  try {
    const {user, additionalUserInfo} = await authApi.loginWithGoogle();
    if (additionalUserInfo.isNewUser) {
      // if new user try to create defualt user profile
      return await handleRequestFromProfileService(
        profileService.handleCreateDefaultUserProfile,
        user,
      );
    }
    // try to get current user profile
    return await handleRequestFromProfileService(
      profileService.handleGetCurrentUserProfile,
      user,
    );
  } catch (err) {
    // TODO: delete the new user if error occured when create default profile
    return handlers.handleError(err.message);
  }
};

// get current user and user profile
handleGetCurrentUserAndUserProfile = async () => {
  try {
    const user = authApi.getCurrentUser();
    if (!user) return null;
    // try to get current user profile
    return await handleRequestFromProfileService(
      profileService.handleGetCurrentUserProfile,
      user,
    );
  } catch (err) {
    return handlers.handleError(err.message);
  }
};

// register
const handleRegisterWithEmailAndPassword = async (name, email, password) => {
  try {
    const {user} = await authApi.registerWithEmailAndPassword(email, password);
    // update name
    await user.updateProfile({
      displayName: name,
    });
    // try to create default profile
    return await handleRequestFromProfileService(
      profileService.handleCreateDefaultUserProfile,
      authApi.getCurrentUser(),
    );
  } catch (err) {
    // TODO: delete the new user if error occured when update the name or create default profile
    return handlers.handleError(err.message);
  }
};

// logout
const handleLogoutCurrentUser = async () => {
  try {
    await authApi.logoutCurrentUser();
    // success
    return handlers.handleSuccess();
  } catch (err) {
    return handlers.handleError(err.message);
  }
};

// handle request from profile service
const handleRequestFromProfileService = async (request, user) => {
  try {
    const response = await request(user.uid);
    // error
    if (!response.isSuccess) return handlers.handleError(response.error);
    // success
    return handlers.handleSuccess({
      user,
      userProfile: response.data,
    });
  } catch (err) {
    return handlers.handleError(err.message);
  }
};

export default {
  handleLoginWithEmailAndPassword,
  handleLoginWithGoogle,
  handleGetCurrentUserAndUserProfile,
  handleRegisterWithEmailAndPassword,
  handleLogoutCurrentUser,
};
