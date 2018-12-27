import React, { Component } from 'react';
import {forms} from '../firebase';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles'
// core components
import CustomForm from '../components/CustomForm/CustomForm.jsx'
import { connect } from 'react-redux'


const styles = theme => ({
  cardCategoryWhite: {
    color: 'rgba(255,255,255,.62)',
    margin: '0',
    fontSize: '14px',
    marginTop: '0',
    marginBottom: '0'
  },
  cardTitleWhite: {
    color: '#FFFFFF',
    marginTop: '0px',
    minHeight: 'auto',
    fontWeight: '300',
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: '3px',
    textDecoration: 'none'
  },

})
const FORM_NAME = 'farm'
let struct = localStorage.getItem(FORM_NAME + '_form')
let values = localStorage.getItem(FORM_NAME + '_values')

class Farm extends Component {
  constructor(props) {
    super(props)
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        console.log(position.coords)
      })}
    this.state = {}
    
  }
  componentDidMount(){
    
    try {
      struct = JSON.parse(struct)
      values = JSON.parse(values)
      if (values !== null && navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          values.location = position.coords
        })
      }
  
      this.setState({ struct, values })
    } catch (e) {
      // handle empty string
      console.log('Error', e)
    }

    
  }

  render() {
    const {struct, values} = this.state;
    const {classes} = this.props;
    return (

      <CustomForm
        name={FORM_NAME}
        struct={struct}
        values={values}
        header={{
          title: 'Datos Personales ',
          description: 'informacion de la finca'
        }}
        submitText="Guardar"
      />
    )
  }
}

Farm = connect()(Farm)

export default withStyles(styles)(Farm)
