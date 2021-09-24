import React, {useEffect, useState, useRef} from 'react';
import {AppState} from 'react-native';
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

  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);

  useEffect(() => {
    handleGetCurrentUserAndUserProfile();
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        console.log('App has come to the foreground!');
      }

      appState.current = nextAppState;
      setAppStateVisible(appState.current);
      console.log('AppState', appState.current);
    });

    return () => {
      subscription.remove();
    };
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
