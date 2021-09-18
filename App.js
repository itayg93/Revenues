import React, {useEffect, useState} from 'react';
import {Alert} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';

import authService from './src/services/authService';
import authContext from './src/auth/authContext';

import AppNavigator from './src/navigation/AppNavigator';
import AuthNavigator from './src/navigation/AuthNavigator';
import InitializingScreen from './src/screens/InitializingScreen';

const App = () => {
  const [initializing, setInitializing] = useState(true);

  const [user, setUser] = useState();
  const [userProfile, setUserProfile] = useState({});

  useEffect(() => {
    handleGetCurrentUserAndUserProfile();
  }, []);

  const handleGetCurrentUserAndUserProfile = async () => {
    const response = await authService.handleGetCurrentUserAndUserProfile();
    setInitializing(false);
    // null
    if (!response) return;
    // error
    if (!response.isSuccess) return Alert.alert('Error', response.error);
    // success
    setUserProfile(response.data.userProfile);
    setUser(response.data.user);
  };

  if (initializing) return <InitializingScreen />;

  return (
    <authContext.Provider value={{user, setUser, userProfile, setUserProfile}}>
      <NavigationContainer>
        {user ? <AppNavigator /> : <AuthNavigator />}
      </NavigationContainer>
    </authContext.Provider>
  );
};

export default App;
