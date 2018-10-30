import React from 'react';
import {Button, Text} from 'native-base';
import { ExpoConfigView } from '@expo/samples';
import {authRef} from '../firebase';
export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'Configuración',
  };
  singOut(){
    authRef.signOut().then(()=>{
      //this.props.navigation.navigate("Auth")
    })
  }

  render() {
    /* Go ahead and delete ExpoConfigView and replace it with your
     * content, we just wanted to give you a quick view of your config */
    return (
      <Button  onPress={this.singOut}>
        <Text>Cerrar Sesión.</Text>
      </Button>

    );
  }
}
