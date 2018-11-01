import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from './store/actions'
import './App.css';
import TestForm from './components/TestForm'

class App extends Component {
  constructor(props){
    super(props)
   // this.props.fetchFormStruct("test_form")

  }
  render() {
    return (
      <div className="App">
        <TestForm></TestForm>
      </div>
    );
  }
}

// connect to store
/* const mapStateToProps = ({ data }) => {
  return {
    data,
  };
}; */

//export default connect(mapStateToProps,actions)(App);

export default App;
