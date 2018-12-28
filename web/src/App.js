import React, { Component } from 'react'
import firebase from './firebase';
//import withRoot from './components/withRoot'
//import {connect} from 'react-redux';
//import * as actions from './store/actions'
//import './App.css';

import { Route, Switch, withRouter } from 'react-router-dom'

import './assets/css/material-dashboard-react.css?v=1.5.0'

import indexRoutes from './routes/index.js'
import { LinearProgress } from '@material-ui/core'

//const FORMS = ["crop_form","farm_form"]
class App extends Component {
  constructor(props) {
    super(props)
    this.state = { completed: false }
  }
  componentDidMount() {
    
    const self = this;
    firebase
      .firestore()
      .enablePersistence()
      .then(function() {
        // Initialize Cloud Firestore through firebase
        console.log('persistence enabled')
        window.firebase = firebase
        self.setState({completed: true})
      })
      .catch(function(err) {
        if (err.code == 'failed-precondition') {
          // Multiple tabs open, persistence can only be enabled
          // in one tab at a a time.
          // ...
          alert('Solo se permite una ventana abierta en el mismo dispositivo')
        } else if (err.code == 'unimplemented') {
          // The current browser does not support all of the
          // features required to enable persistence
          // ...
          alert('navegador no soportado para trabajar offline')
          window.firebase = firebase
          self.setState({completed: true})
        }
      })
  }
  render() {
    const prop = indexRoutes;
    return this.state.completed ? (
      <Route path={prop.path} component={prop.component}/>
        
    ) : (
      <LinearProgress />
    )
  }
}

/* const mapStateToProps = ({ formStruct, coords }) => {
  return {
    formStruct,
    coords
  };
};
 */
export default withRouter(App)
