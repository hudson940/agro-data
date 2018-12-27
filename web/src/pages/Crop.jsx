import React from 'react'

import CustomForm from '../components/CustomForm/CustomForm'
//import TestForm from '../components/CustomForm/TestForm';

const FORM_NAME = 'crop'

class Crop extends React.Component {

  constructor(props){
    super(props)
    let struct = localStorage.getItem(FORM_NAME + '_form')
    let values = localStorage.getItem(
    FORM_NAME + props.match.params.id + '_values'
  )
  try {
    this.state = {struct:JSON.parse(struct), values: JSON.parse(values) }
  } catch (e) {
    // handle empty string
    console.log('Error', e)
  }
  }
  
  render(){
    const {struct, values} = this.state;
    const id = this.props.match.params.id;
      return (
    <CustomForm
      name={FORM_NAME+id}
      struct={struct}
      values={values}
      header={{
        title: 'Modificar Cultivo',
        description: 'informacion del cultivo'
      }}
      submitText="Guardar"
    />
  )
  }

}

export default Crop
