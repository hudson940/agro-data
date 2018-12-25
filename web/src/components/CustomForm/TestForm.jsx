import React from 'react'
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
class TestForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {};
  
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
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
        const handleChange = this.handleChange;
        const state = this.state;
        const {struct, submitText, classes, header} = this.props;
    
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
                {  struct!==undefined?
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
                      }):null
                }
                <Button color="primary" type="submit" round>
                  {submitText?submitText:'Enviar'}
                </Button>
              </form>
              </CardBody>
              </Card>
            </GridContainer>
          </div>
        );
    }
  }

  export default withStyles(styles)(TestForm)