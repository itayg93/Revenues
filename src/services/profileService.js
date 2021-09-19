import profileApi from '../api/profileApi';
import handlers from '../utils/handlers';

// get default user profile
const handleGetDefaultUserProfile = () => {
  return profileApi.getDefaultUserProfile();
};

// create default user profile
const handleCreateDefaultUserProfile = async userId => {
  try {
    await profileApi.createDefaultUserProfile(userId);
    // success
    return handlers.handleSuccess(handleGetDefaultUserProfile());
  } catch (err) {
    return handlers.handleError(err.message);
  }
};

// get current user profile
const handleGetCurrentUserProfile = async userId => {
  try {
    const documentSnapshot = await profileApi.getCurrentUserProfile(userId);
    // error
    if (!documentSnapshot.exists)
      return handlers.handleError('No user profile.');
    // success
    return handlers.handleSuccess(documentSnapshot.data());
  } catch (err) {
    return handlers.handleError(err.message);
  }
};

export default {
  handleGetDefaultUserProfile,
  handleCreateDefaultUserProfile,
  handleGetCurrentUserProfile,
};
