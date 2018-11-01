import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { createSwitchNavigator, createStackNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import LoginForm from '../screens/Login';
//import firebase from 'react-native-firebase';
import { authRef } from '../firebase';
import SignUp from '../screens/Login/SignUp';
const AuthStack = createStackNavigator({
  SignIn: LoginForm,
});

const SignUpUpStack = createStackNavigator({
  SignUp: SignUp,
})

class Loading extends React.Component{
  componentDidMount(){
    authRef.onAuthStateChanged(user => {
      console.log(user)
      this.props.navigation.navigate(user ? 'Main' : 'Auth')
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>Loading</Text>
        <ActivityIndicator size="large" />
      </View>
    )
  }
}

const LoadingStack = createStackNavigator({
  Loading: Loading,
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})
export default createSwitchNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  Main: MainTabNavigator,
  Auth: AuthStack,
  Loading: LoadingStack,
  SignUp: SignUpUpStack,
},
{
  initialRouteName: 'Loading'
}
);