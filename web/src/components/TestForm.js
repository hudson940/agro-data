import React, { Component } from 'react'
import t from 'tcomb-form'
import { connect } from 'react-redux'
import * as actions from '../store/actions'

//import { View, StyleSheet } from 'react-native';
//import modelForm, {Form, docs} from './dataTestForm';

const Form = t.form.Form
const parseDataToTcombForm = data => {
  let model = {}
  Object.keys(data).map((document, index) => {
    let type = t[data[document]]
    if (type) model[document] = type
  })
  return t.struct(model)
}

class TestForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      formName: 'test_form',
      formStruct: props.struct,
    }
  }

  componentDidMount() {
    this.setState({
        formStruct: this.props.formStruct[this.state.formName]
      })
  }

  render() {
    const FormTestC = () => {
      let formStruct = this.state.formStruct
      if (formStruct && Object.keys(formStruct).length) {
        return <Form type={parseDataToTcombForm(formStruct)} />
      } else return <h1>Loading</h1>
    }
    console.log('rendering')
    return (
      <div>
        <FormTestC />
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



export default TestForm;
