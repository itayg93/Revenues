import React, {useEffect, useState} from 'react';
import {Alert} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';

import authService from './src/services/authService';
import authContext from './src/auth/authContext';

import AppNavigator from './src/navigation/AppNavigator';
import AuthNavigator from './src/navigation/AuthNavigator';

const App = () => {
  const [initializing, setInitializing] = useState(true);

  const [user, setUser] = useState();
  const [userProfile, setUserProfile] = useState({});

  useEffect(() => {
    handleGetCurrentUserAndUserProfile();
  }, []);

  const handleGetCurrentUserAndUserProfile = async () => {
    const authResponse = await authService.handleGetCurrentUserAndUserProfile();
    setInitializing(false);

    if (!authResponse) return;

    // error
    if (!authResponse.isSuccess)
      return Alert.alert('Error', authResponse.error);

    // success
    setUserProfile(authResponse.data.userProfile);
    setUser(authResponse.data.user);
  };

  // FIXME:
  if (initializing) return null;

  return (
    <authContext.Provider value={{user, setUser, userProfile, setUserProfile}}>
      <NavigationContainer>
        {user ? <AppNavigator /> : <AuthNavigator />}
      </NavigationContainer>
    </authContext.Provider>
  );
};

export default App;
