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
    const document = await profileApi.getCurrentUserProfile(userId);
    // error
    if (!document.exists) return handlers.handleError('No user profile.');
    // success
    return handlers.handleSuccess(document.data());
  } catch (err) {
    return handlers.handleError(err.message);
  }
};

// update current user profile
const handleUpdateCurrentUserProfile = async (userId, values) => {
  try {
    let updatedValues = {timestamp: Date.now()};
    Object.entries(values).forEach(([key, value]) => {
      if (value !== '') updatedValues[key] = parseFloat(value);
    });
    await profileApi.updateCurrentUserProfile(userId, updatedValues);
    // success
    return await handleGetCurrentUserProfile(userId);
  } catch (err) {
    return handlers.handleError(err.message);
  }
};

export default {
  handleGetDefaultUserProfile,
  handleCreateDefaultUserProfile,
  handleGetCurrentUserProfile,
  handleUpdateCurrentUserProfile,
};
