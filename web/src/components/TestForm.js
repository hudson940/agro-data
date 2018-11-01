import React, { Component } from 'react';
import t from 'tcomb-form';
import {connect} from 'react-redux';
import * as actions from '../store/actions';

//import { View, StyleSheet } from 'react-native';
//import modelForm, {Form, docs} from './dataTestForm';

const Form = t.form.Form;
const parseDataToTcombForm = (data) => {
  let model = {};
  Object.keys(data).map((document, index) => {
    let type = t[data[document]]
    if (type) model[document] = type 
  })
  return t.struct(model);
}

class TestForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      
    }
    this.props.fetchFormStruct("test_form")
  }

  componentDidMount() {

    }

  render() {
  const  FormUser = () => {
    let formStruct = this.props.formStruct;
    if (Object.keys(formStruct).length){
      return <Form type={parseDataToTcombForm(formStruct)}></Form>
    }
    else return <h1>Loading</h1>

  }
  console.log("rendering")
    return (
      <div>
       <FormUser/> 
      </div>
    )
  }
}

/*   const styles = StyleSheet.create({
    container: {
      justifyContent: 'center',
      marginTop: 50,
      padding: 20,
      backgroundColor: '#ffffff',
    },
  }); */

  const mapStateToProps = ({ formStruct }) => {
    return {
      formStruct,
    };
  };
  
  export default connect(mapStateToProps,actions)(TestForm);
