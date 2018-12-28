import React, { Component } from 'react'

// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles'
import CircularProgress from '@material-ui/core/CircularProgress'
// core components
import CustomForm from '../components/CustomForm/CustomForm.jsx'
//import { connect } from 'react-redux'

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
  progress: {
    margin: theme.spacing.unit * 2
  }
})
const FORM_NAME = 'farm_form'
const EMAIL = 'andersonvidal94@gmail.com';
class Farm extends Component {
  constructor(props) {
    super(props)
    let coords
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        coords = position.coords
      })
      this.state = { coords: coords }
    } else this.state = {}
  }

  componentDidMount() {
    const self = this
    const struct = []
    const db = window.firebase.firestore()
    const config = db.collection('config')
    // obtiene las preguntas del formulario y las agrega a @struct
    config
      .doc('forms')
      .collection(FORM_NAME)
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          struct.push(doc.data())
        })
        self.setState({ struct: struct })
      })
      .catch(err => {
        console.log('Error getting documents', err)
        this.setState({
          struct: [
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
              options: [{ value: 50, option: 'Meta' }]
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
              id: 'owner_name',
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
                step: 0.1
              }
            }
          ]
        })
      })
    this.setState({
      values: db.collection('farms').doc(EMAIL)
    })
  }

  render() {
    const { struct, values } = this.state
    const { classes } = this.props
    return struct && values ? (
      <CustomForm
        name={FORM_NAME}
        struct={struct}
        values={values}
        header={{
          title: 'Datos Personales ',
          description: 'información de la finca'
        }}
        submitText="Guardar"
      />
    ) : (
      <div>
        <h1>Cargando preguntas ...</h1>
        <CircularProgress className={classes.progress} variant="determinate" />
      </div>
    )
  }
}

//Farm = connect()(Farm)

export default withStyles(styles)(Farm)
