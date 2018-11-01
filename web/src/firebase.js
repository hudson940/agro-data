import firebase from 'firebase';
import configKeys from './configFirebase';

firebase.initializeApp(configKeys)

export const db = firebase.firestore();
export const config = db.collection('config')
export const authRef = firebase.auth();
export const provider = new firebase.auth.GoogleAuthProvider();
