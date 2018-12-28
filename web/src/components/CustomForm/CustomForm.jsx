import React, { Component } from 'react'
//import PropTypes from 'prop-types'
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
import CardHeader from '../Card/CardHeader.jsx'
//import CardAvatar from '../Card/CardAvatar.jsx'
import CardBody from '../Card/CardBody.jsx'
import InputAdornment from '@material-ui/core/InputAdornment';
//import CardFooter from '../Card/CardFooter.jsx'
import Snackbar from '@material-ui/core/Snackbar';
//import Icon from '@material-ui/core/Icon'
import IconButton from "@material-ui/core/IconButton";
import Update from '@material-ui/icons/Update';
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
  button: {
    margin: theme.spacing.unit,
  },
})

class CustomForm extends Component {
   constructor(props) {
    super(props);
   // const values  = props.values
    this.state = {};
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  } 
  componentDidMount(){
    const docRef = this.props.values;
    const self = this
    
    docRef.get().then(doc => {
      if(doc.exists){
        let values = doc.data()
        self.setState(values)
      }
    }).catch(err => {
      console.log('Error getting documents', err);
    })
  }


  handleSubmit(event) {
    //this.setState({[event.target.name]:event.target.value})
    event.preventDefault()
    const docRef = this.props.values;
    let values = this.state
    console.log(values)
    docRef.set(values)
  
    this.setState({open:true})

  }
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  render() {
    const handleChange = this.handleChange;
    const state = this.state;
    const {struct ,submitText, classes, header} = this.props;

    return (
      <div>
        <GridContainer>
          <Card>
             { header? (
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>{header.title}</h4>
                <p className={classes.cardCategoryWhite}>
                  {header.description}
                </p>
              </CardHeader>    
              ):null}
          
          <CardBody>
          <form onSubmit={this.handleSubmit}>
            {  struct?
                struct.map((s, key) => {
                    
                    if(s.type === 'select')
                    return (
                      <GridItem xs={12} sm={12} md={8} key={key}>
                      <CustomSelect 
                      labelText={s.labelText}
                      id = {s.id}
                      inputProps = {{
                        ...s.inputProps, 
                        onChange: handleChange,
                        name: s.id,
                        value : state[s.id],
                        endAdornment: s.endAdornment?<InputAdornment position="end">{s.endAdornment}</InputAdornment>:undefined                       
                      }}
                      labelProps = {s.labelProps ||{shrink: Boolean(state[s.id])}}
                      options = {s.options}
                      formControlProps={s.formControlProps}

                      />
                      </GridItem>
                    )
                    else if(s.type === 'checkbox')
                    return (
                      <GridItem xs={12} sm={12} md={8} key={key}>
                      <InputLabel htmlFor={s.id}>
                      {s.labelText}
                      </InputLabel>
                      <Checkbox
                      checked = {state[s.id]} 
                      onChange = {(event)=> this.setState({[s.id]:event.target.checked})}
                      name = {s.id}
                      id = {s.id}                      
                      />
                      </GridItem>
                    )
                    else 
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
                                type: s.type,
                                endAdornment: s.endAdornment?<InputAdornment position="end">{s.endAdornment}</InputAdornment>:undefined
                             }}
                             labelProps = {s.labelProps ||{shrink: Boolean(state[s.id])}}
                          />
                        </GridItem>
                      )
                  }): 
                    <IconButton color="secondary" onClick = {() => window.location.reload()} className={classes.button} >
                  Recargue para continuar<Update/>
                </IconButton>
                                  
            }
            <Button color="primary" type="submit" round>
              {submitText?submitText:'Enviar'}
            </Button>
          </form>
          </CardBody>
          </Card>
        </GridContainer>
        <Snackbar
          open={this.state.open}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          autoHideDuration={3000}
          message={<span id="message-id">Información guardada</span>}
        />
      </div>
    )
  }
}


export default withStyles(styles)(CustomForm)
