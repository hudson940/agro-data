import React from 'react';

import CustomForm from '../components/CustomForm/CustomForm';
import CircularProgress from '@material-ui/core/CircularProgress';
import withStyles from '@material-ui/core/styles/withStyles';
import firebase, { authRef } from '../firebase';
//import TestForm from '../components/CustomForm/TestForm';

const FORM_NAME = 'crop_form';


const styles = theme => ({
  cardCategoryWhite: {
    color: 'rgba(255,255,255,.62)',
    margin: '0',
    fontSize: '14px',
    marginTop: '0',
    marginBottom: '0',
  },
  cardTitleWhite: {
    color: '#FFFFFF',
    marginTop: '0px',
    minHeight: 'auto',
    fontWeight: '300',
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: '3px',
    textDecoration: 'none',
  },
  progress: {
    margin: theme.spacing.unit * 2,
  },
});
class Crop extends React.Component {
  state = {};

  componentDidMount() {
    const self = this;
    const struct = [];
    const db = firebase.firestore();
    let userId;
    if(authRef.currentUser !== null) 
    userId = authRef.currentUser.uid;
    // obtiene las preguntas del formulario y las agrega a @struct
    db.collection('config')
      .doc('forms')
      .collection(FORM_NAME)
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          struct.push(doc.data());
        });
        self.setState({ struct: struct });
      })
      .catch(err => {
        console.log('Error getting documents', err);
      });
    let values =
      this.props.match.params.id === ':id'
        ? db
            .collection('farms')
            .doc(userId)
            .collection('crops')
            .doc()
        : db
            .collection('farms')
            .doc(userId)
            .collection('crops')
            .doc(this.props.match.params.id);
    this.setState({
      values: values,
    });
  }

  render() {
    const { struct, values } = this.state;
    const { classes } = this.props;
    return struct && values ? (
      <CustomForm
        name={FORM_NAME}
        struct={struct}
        values={values}
        header={{
          title: 'Datos Personales ',
          description: 'informacion de la finca',
        }}
        submitText="Guardar"
      />
    ) : (
      <div>
        <h1>Cargando preguntas... </h1>
        <CircularProgress className={classes.progress} />
      </div>
    );
  }
}

export default withStyles(styles)(Crop);
