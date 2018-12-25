import React, { Component } from 'react'
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles'
// core components
import CustomForm from "../components/CustomForm/CustomForm.jsx";


const styles = {
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
  }
}

const struct = [
  {
    type: 'text',
    labelText: 'Ubicación (Desabilitado)',
    id: 'location',
    formControlProps: {
      fullWidth: true
    },
    inputProps: {
      disabled: true
    }
  },
  {
    type: 'select',
    labelText: 'Departamento',
    id: 'state',
    formControlProps: {
      fullWidth: true
    },
    inputProps: {
      disabled: false
    },
    options: [{value: 50, option: 'Meta'}]
  },
  {
    type: 'text',
    labelText: 'Ciudad',
    id: 'city',
    formControlProps: {
      fullWidth: true
    },
    inputProps: {
      disabled: false
    }
  },
  {
    type: 'text',
    labelText: 'Nombre Propietario',
    id: 'owner-name',
    formControlProps: {
      fullWidth: true
    },
    inputProps: {
      disabled: false
    }
  },
  {
    type: 'text',
    labelText: 'Telefono',
    id: 'phone',
    formControlProps: {
      fullWidth: true
    },
    inputProps: {
      disabled: false
    }
  },
  {
    type: 'number',
    labelText: 'Área Total',
    id: 'area',
    formControlProps: {
      fullWidth: true
    },
    inputProps: {
      disabled: false,
      step: 0.1,
    }
  }
]

const values = {
  location: 'location',
  state: 'Meta',
}
class Farm extends Component {
  constructor(props) {
    super(props)
    
      if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          values.location = `latitud:${position.coords.latitude}, longitud: ${position.coords.longitude}`
        });
      } else {
        console.log("Geo Location not supported by browser");
      }
    
    this.state = { ...values}
  }

   componentDidMount(){
    navigator.geolocation.getCurrentPosition(position => {
      let location = `latitud:${position.coords.latitude}, longitud: ${position.coords.longitude}`
      this.setState({location})
    });
   }
  

  handleSubmit(event) {
    //this.setState({[event.target.name]:event.target.value})
    event.preventDefault()
    console.log(this.state)
  }
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  render() {
    const { classes } = this.props
    const handleChange = this.handleChange
    const state = this.state
    return (
      <div>
        <CustomForm
        struct={struct}
        values={values}
        header={{
          title: 'Modificar Cultivo',
          description: 'informacion del cultivo'
        }}
        submitText="Guardar"
      ></CustomForm> 
      </div>
    )
  }
}

export default withStyles(styles)(Farm)
