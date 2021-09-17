import profileApi from '../api/profileApi';

// get default user profile
const handleGetDefaultUserProfile = () => {
  return profileApi.getDefaultUserProfile();
};

// create default user profile
const handleCreateDefaultUserProfile = async userId => {
  try {
    await profileApi.createDefaultUserProfile(userId);
    // success
    return handleSuccess();
  } catch (err) {
    return handleError(err.message);
  }
};

// get current user profile
const handleGetCurrentUserProfile = async userId => {
  try {
    const documentSnapshot = await profileApi.getCurrentUserProfile(userId);
    // error
    if (!documentSnapshot.exists) return handleError('No user profile.');
    // success
    return handleSuccess({userProfile: documentSnapshot.data()});
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
  handleGetDefaultUserProfile,
  handleCreateDefaultUserProfile,
  handleGetCurrentUserProfile,
};
