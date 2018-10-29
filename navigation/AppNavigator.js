import React from 'react';
import { createSwitchNavigator, createStackNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import LoginForm from '../screens/Login';

const AuthStack = createStackNavigator({
  SingIn: LoginForm,
})

export default createSwitchNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  Main: MainTabNavigator,
  Auth: AuthStack,
},
{
  initialRouteName: 'Auth'
}
);