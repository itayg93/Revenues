import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import routes from './routes';
import WelcomeScreen from '../screens/WelcomeScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';

const Stack = createStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={routes.WELCOME_SCREEN}
        component={WelcomeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen name={routes.LOGIN_SCREEN} component={LoginScreen} />
      <Stack.Screen name={routes.REGISTER_SCREEN} component={RegisterScreen} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
