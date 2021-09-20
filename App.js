import React, {useEffect, useState} from 'react';
import {Provider} from 'react-native-paper';
import {NavigationContainer} from '@react-navigation/native';

import authService from './src/services/authService';
import authContext from './src/auth/authContext';
import AppNavigator from './src/navigation/AppNavigator';
import AuthNavigator from './src/navigation/AuthNavigator';
import handlers from './src/utils/handlers';

const App = () => {
  const [initializing, setInitializing] = useState(true);

  const [user, setUser] = useState();
  const [userProfile, setUserProfile] = useState();

  useEffect(() => {
    handleGetCurrentUserAndUserProfile();
  }, []);

  const handleGetCurrentUserAndUserProfile = async () => {
    const response = await authService.handleGetCurrentUserAndUserProfile();
    setInitializing(false);
    // null
    if (!response) return;
    // error
    if (!response.isSuccess) return handlers.handleErrorAlert(response.error);
    // success
    setUserProfile(response.data.userProfile);
    setUser(response.data.user);
  };

  if (initializing) return null;

  return (
    <Provider>
      <authContext.Provider
        value={{user, setUser, userProfile, setUserProfile}}>
        <NavigationContainer>
          {user ? <AppNavigator /> : <AuthNavigator />}
        </NavigationContainer>
      </authContext.Provider>
    </Provider>
  );
};

export default App;
