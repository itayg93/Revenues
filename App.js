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

  useEffect(() => {
    handleGetCurrentUser();
  }, []);

  const handleGetCurrentUser = async () => {
    const response = await authService.handleGetCurrentUser();

    // error
    if (!response.isSuccess) return Alert.alert('Error', response.error);

    // success
    setUser(response.data);
    if (initializing) setInitializing(false);
  };

  if (initializing) return null;

  return (
    <authContext.Provider value={{user, setUser}}>
      <NavigationContainer>
        {user ? <AppNavigator /> : <AuthNavigator />}
      </NavigationContainer>
    </authContext.Provider>
  );
};

export default App;
