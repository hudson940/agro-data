import firebase from 'firebase';
import config from './configFirebase';

firebase.initializeApp(config)

//export const dbRef = firebase.database().ref();
export const authRef = firebase.auth();
export const provider = new firebase.auth.GoogleAuthProvider();
