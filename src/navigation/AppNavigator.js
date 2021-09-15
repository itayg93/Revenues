import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import routes from './routes';
import AccountScreen from '../screens/AccountScreen';
import DashboardScreen from '../screens/DashboardScreen';
import RevenuesScreen from '../screens/RevenuesScreen';

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName={routes.DASHBOARD_SCREEN}
      screenOptions={{headerShown: false}}>
      <Tab.Screen
        name={routes.ACCOUNT_SCREEN}
        component={AccountScreen}
        options={{
          tabBarIcon: ({size, color}) => (
            <MaterialCommunityIcons name="account" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name={routes.DASHBOARD_SCREEN}
        component={DashboardScreen}
        options={{
          tabBarIcon: ({size, color}) => (
            <MaterialCommunityIcons
              name="view-dashboard"
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name={routes.REVENUES_SCREEN}
        component={RevenuesScreen}
        options={{
          tabBarIcon: ({size, color}) => (
            <MaterialCommunityIcons
              name="checkbook"
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default AppNavigator;
