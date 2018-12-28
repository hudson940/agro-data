import React from 'react'

import CustomForm from '../components/CustomForm/CustomForm'
import CircularProgress from '@material-ui/core/CircularProgress'
import withStyles from '@material-ui/core/styles/withStyles'
//import TestForm from '../components/CustomForm/TestForm';

const FORM_NAME = 'crop_form'
const EMAIL = 'andersonvidal94@gmail.com'
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
class Crop extends React.Component {
  state = {}

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
              type: 'checkbox',
              labelText: 'Activo',
              id: 'active',
              formControlProps: {
                fullWidth: true
              },
              inputProps: {
                disabled: true
              }
            },
            {
              type: 'text',
              labelText: 'Cultivo',
              id: 'crop',
              formControlProps: {
                fullWidth: true
              },
              inputProps: {
                disabled: false
              }
            },
            {
              type: 'select',
              labelText: 'Tipo',
              id: 'type',
              formControlProps: {
                fullWidth: true
              },
              inputProps: {
                disabled: false,
                name: 'type',
                id: 'type'
              },
              options: [
                { value: 'Permanente', option: 'Permanente' },
                { value: 'Transitorio', option: 'Transitorio' }
              ]
            },
            {
              type: 'checkbox',
              labelText: '¿Semilla certificada?',
              id: 'seed_certified',
              formControlProps: {
                fullWidth: false
              },
              inputProps: {
                disabled: false
              }
            },
            {
              type: 'date',
              labelText: 'Fecha inicial',
              id: 'initial_date',
              formControlProps: {
                fullWidth: true
              },
              inputProps: {
                disabled: false
              },
              labelProps: {
                shrink: true
              }
            },
            {
              type: 'date',
              labelText: 'Fecha finalización',
              id: 'end_date',
              formControlProps: {
                fullWidth: true
              },
              labelProps: {
                shrink: true
              },
              inputProps: {
                disabled: false
              }
            },
            {
              type: 'number',
              labelText: 'Producción Estimada',
              endAdornment: 'Toneladas',
              id: 'production_est',
              formControlProps: {
                fullWidth: false
              },
              inputProps: {
                disabled: false
              }
            },
            {
              type: 'number',
              labelText: 'Producción real',
              endAdornment: 'Toneladas',
              id: 'production',
              formControlProps: {
                fullWidth: false
              },
              inputProps: {
                disabled: false
              }
            },
            {
              type: 'number',
              labelText: 'Área sembrada',
              endAdornment: 'Hectareas',
              id: 'area',
              formControlProps: {
                fullWidth: false
              },
              inputProps: {
                disabled: false
              }
            },
            {
              type: 'number',
              labelText: 'Densidad por hectarea',
              id: 'density_ha',
              formControlProps: {
                fullWidth: false
              },
              inputProps: {
                disabled: false
              }
            },
            {
              type: 'inputs',
              labelText: 'Insumos',
              id: 'inputs',
              formControlProps: {
                fullWidth: true
              },
              inputProps: {
                disabled: false
              }
            }
          ]
        })
      })
    let values =
      this.props.match.params.id === ':id'
        ? db
            .collection('farms')
            .doc(EMAIL)
            .collection('crops')
            .doc()
        : db
            .collection('farms')
            .doc(EMAIL)
            .collection('crops')
            .doc(this.props.match.params.id)
    this.setState({
      values: values
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
          description: 'informacion de la finca'
        }}
        submitText="Guardar"
      />
    ) : (
      <div>
        <h1>Cargando preguntas... </h1>
        <CircularProgress className={classes.progress} />
      </div>
    )
  }
}

export default withStyles(styles)(Crop)
