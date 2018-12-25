import React, { Component } from 'react';
//import withRoot from './components/withRoot'
import {connect} from 'react-redux';
import * as actions from './store/actions'
//import './App.css';
import { createBrowserHistory } from "history";
import { Router, Route, Switch, withRouter } from "react-router-dom";

import "./assets/css/material-dashboard-react.css?v=1.5.0";

import indexRoutes from "./routes/index.js";

const FORMS = ["test_form","farm_form"]
class App extends Component {
  constructor(props){
    super(props)
    FORMS.forEach( f =>{
      this.props.fetchFormStruct(f)
    })
    

  }
  render() {
    return (
      
      <Switch>
        {indexRoutes.map((prop, key) => {
          return <Route path={prop.path} component={prop.component} key={key} />;
        })}
      </Switch>

    );
  }
}

const mapStateToProps = ({ formStruct }) => {
  return {
    formStruct,
  };
};

export default withRouter(connect(mapStateToProps,actions)(App));

