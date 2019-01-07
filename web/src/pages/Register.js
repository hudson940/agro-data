import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import AddAlert from '@material-ui/icons/AddAlert';
import SnackBar from '../components/Snackbar/Snackbar';
import CustomInput from '../components/CustomInput/CustomInput';
import { authRef } from '../firebase';
import GridItem from '../components/Grid/GridItem';

const styles = theme => ({
  root: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  button: {
    marginTop: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit,
  },
  actionsContainer: {
    marginBottom: theme.spacing.unit * 2,
  },
  resetContainer: {
    padding: theme.spacing.unit * 3,
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`,
  },
});

function getSteps() {
  return [
    'Registrar correo y contraseña',
    'Ingresar datos básicos',
    'Aceptar términos',
  ];
}

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeStep: 0,
      openSnack: false,
      snackMessage: undefined,
    };
    this.handleChange = this.handleChange.bind(this);
    // this.checkEmailAndPassword = this.checkEmailAndPassword.bind(this);
  }

  checkEmailAndPassword = event => {
    const { password, password2, email } = this.state;
    if (email && !email.match('@')) throw new Error('Email no valido');
    if (!password) throw new Error('Contraseña en blanco');
    if (password !== password2) throw new Error('Las contraseñas no coinciden');
  };

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  handleRegister = () => {
    const { password, email } = this.state;
    const { history } = this.props;
    authRef.createUserWithEmailAndPassword(email, password).then(response => {
      //authRef.signInWithEmailAndPassword(email,password)
      console.log(authRef.currentUser);
      history.push('/app');
    });
  };
  handleNext = () => {
    const step = this.state.activeStep;
    if (step === 0) {
      try {
        this.checkEmailAndPassword();
        this.setState(state => ({
          activeStep: state.activeStep + 1,
          openSnack: false,
        }));
      } catch (error) {
        console.log(error);
        this.setState({
          snackMessage: error.message,
          openSnack: true,
          snackColor: 'danger',
        });
      }
    } else if (step === 1) {
      this.setState(state => ({
        activeStep: state.activeStep + 1,
      }));
    } else if (step === 2) {
      this.setState(state => ({
        activeStep: state.activeStep + 1,
      }));
    }
  };

  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1,
    }));
  };

  handleReset = () => {
    this.setState({
      activeStep: 0,
    });
  };
  getStepContent(step) {
    const state = this.state;
    const formControlProps = {
      fullWidth: true,
    };
    switch (step) {
      case 0:
        return (
          <GridItem xs={12}>
            <CustomInput
              labelText="Correo Electrónico"
              inputProps={{
                onChange: this.handleChange,
                name: 'email',
                value: state.email,
                type: 'email',
              }}
              formControlProps={formControlProps}
            />
            <CustomInput
              labelText="Contraseña"
              inputProps={{
                onChange: this.handleChange,
                name: 'password',
                value: state.password,
                type: 'password',
              }}
              formControlProps={formControlProps}
            />
            <CustomInput
              labelText="Repetir Contraseña"
              inputProps={{
                onChange: this.handleChange,
                name: 'password2',
                value: state.password2,
                type: 'password',
              }}
              formControlProps={formControlProps}
            />
          </GridItem>
        );
      case 1:
        return 'An ad group contains one or more ads which target a shared set of keywords.';
      case 2:
        return `Try out different ad text to see what brings in the most customers,
                and learn how to enhance your ads using features like ad extensions.
                If you run into any problems with your ads, find out how to tell if
                they're running and how to resolve approval issues.`;
      default:
        return 'Unknown step';
    }
  }

  render() {
    const { classes } = this.props;
    const steps = getSteps();
    const { activeStep, snackColor, openSnack, snackMessage } = this.state;

    return (
      <main className={classes.root}>
        <SnackBar
          place="tl"
          color={snackColor}
          icon={AddAlert}
          message={snackMessage}
          open={openSnack}
          closeNotification={() => this.setState({ openSnack: false })}
          close
        />

        <Paper className={classes.paper}>
          <Stepper activeStep={activeStep} orientation="vertical">
            {steps.map((label, index) => {
              return (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                  <StepContent>
                    <Typography>{this.getStepContent(index)}</Typography>
                    <div className={classes.actionsContainer}>
                      <div>
                        <Button
                          disabled={activeStep === 0}
                          onClick={this.handleBack}
                          className={classes.button}
                        >
                          Back
                        </Button>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={this.handleNext}
                          className={classes.button}
                        >
                          {activeStep === steps.length - 1
                            ? 'Finalizar'
                            : 'Siguiente'}
                        </Button>
                      </div>
                    </div>
                  </StepContent>
                </Step>
              );
            })}
          </Stepper>
          {activeStep === steps.length && (
            <Paper square elevation={0} className={classes.resetContainer}>
              <Typography>Has completado todos los pasos</Typography>
              <Button onClick={this.handleRegister} className={classes.button}>
                Iniciar aplicación
              </Button>
            </Paper>
          )}
        </Paper>
      </main>
    );
  }
}

Register.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(Register);
