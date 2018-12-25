import React, { Component } from 'react'
import PropTypes from 'prop-types'
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles'
import Checkbox from '@material-ui/core/Checkbox'
import InputLabel from '@material-ui/core/InputLabel'
import CustomSelect from '../CustomSelect/CustomSelect'
import GridItem from '../Grid/GridItem.jsx'
import GridContainer from '../Grid/GridContainer.jsx'
import CustomInput from '../CustomInput/CustomInput.jsx'
import Button from '../CustomButtons/Button.jsx'
import Card from '../Card/Card.jsx'

//import CardHeader from '../Card/CardHeader.jsx'
//import CardAvatar from '../Card/CardAvatar.jsx'
import CardBody from '../Card/CardBody.jsx'
//import CardFooter from '../Card/CardFooter.jsx'

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
    type: 'input',
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
    options: [{value: 'Permanente', option: 'Permanente'}, {value: 'Transitorio', option: 'Transitorio'}]
  },
  {
    type: 'checkbox',
    labelText: '¿Semilla certificada?',
    id: 'seed_certified',
    formControlProps: {
      fullWidth: true
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
    }
  },
  {
    type: 'date',
    labelText: 'Fecha finalización',
    id: 'end_date',
    formControlProps: {
      fullWidth: true
    },
    inputProps: {
      disabled: false
    }
  },
  {
    type: 'input',
    labelText: 'Producción Estimada (ton)',
    id: 'production_est',
    formControlProps: {
      fullWidth: true
    },
    inputProps: {
      disabled: false
    }
  },
  {
    type: 'input',
    labelText: 'Producción real (ton)',
    id: 'production',
    formControlProps: {
      fullWidth: true
    },
    inputProps: {
      disabled: false
    }
  },
  {
    type: 'input',
    labelText: 'Área en hectareas',
    id: 'area',
    formControlProps: {
      fullWidth: true
    },
    inputProps: {
      disabled: false
    }
  },
  {
    type: 'input',
    labelText: 'Densidad por hectarea',
    id: 'density_ha',
    formControlProps: {
      fullWidth: true
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
const values = {
  active: true,
  crop: undefined,
  type: String,
  seed_certified: false,
  initial_date: undefined,
  end_date: undefined,
  production_est: undefined,
  production: undefined,
  area: undefined,
  density_ha: undefined,
  input: undefined,
}
class Crop extends Component {
  constructor(props) {
    super(props)
    this.state = { ...values}
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
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
    const handleChange = this.handleChange
    const state = this.state

    return (
      <div>
        <GridContainer>
          <Card>
          <CardBody>
          <form onSubmit={this.handleSubmit}>
            {
                struct.map((s, key) => {
                    if (s.type === 'input')
                      return (
                        <GridItem xs={12} sm={12} md={8} key={key}>
                          <CustomInput key={key}
                            labelText={s.labelText}
                            id={s.id}
                            formControlProps={s.formControlProps}
                            inputProps={{ 
                                ...s.inputProps, 
                                name: s.id, 
                                value: state[s.id],
                                onChange: handleChange,
                             }}
                          />
                        </GridItem>
                      )
                    else if(s.type === 'checkbox')
                    return (
                      <GridItem xs={12} sm={12} md={8} key={key}>
                      <InputLabel>
                      {s.labelText}
                      </InputLabel>
                      <Checkbox 
                      classes = {{checked:state[s.id]}}
                      value = {state[s.id]}
                      onChange = {()=> this.setState({[s.id]:!state[s.id]})}
                      name = {s.id}                      
                      />
                      </GridItem>
                    )
                    else if(s.type === 'select')
                    return (
                      <GridItem xs={12} sm={12} md={8} key={key}>
                      <CustomSelect 
                      labelText={s.labelText}
                      id = {s.id}
                      inputProps = {{
                        ...s.inputProps, 
                        onChange: handleChange,                        
                      }}
                      value = {state[s.id]}
                      options = {s.options}
                      formControlProps={s.formControlProps}

                      />
                      </GridItem>
                    )
                  })
            }
            <Button color="primary" type="submit" round>
              Editar
            </Button>
          </form>
          </CardBody>
          </Card>
        </GridContainer>
      </div>
    )
  }
}

export default withStyles(styles)(Crop)
