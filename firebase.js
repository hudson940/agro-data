import firebase from 'firebase';
import config from './configFirebase';

firebase.initializeApp(config)

export const db = firebase.database();
export const authRef = firebase.auth();
export const provider = new firebase.auth.GoogleAuthProvider();
