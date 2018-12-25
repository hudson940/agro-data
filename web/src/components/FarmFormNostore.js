import React, { Component } from 'react';
import t from 'tcomb-form';
import {fetchFormStruct} from '../helpers'

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

class FarmForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
        struct: new Object(),
    }

  }

  componentDidMount() {
    fetchFormStruct("farm_form").then(data => this.setState({
        struct: data,
    }) )
    }

  render() {
    const  SchemaForm = () => {
    let formStruct = this.state.struct;
    if (Object.keys(formStruct).length){
      return <Form type={parseDataToTcombForm(formStruct)}></Form>
    }
    else return <h1>Loading</h1>

  }
  console.log("rendering")
    return (
      <div>
       <SchemaForm/> 
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

  
  export default FarmForm;
