import firebase from 'firebase'
import configKeys from './configFirebase'

var db;

firebase.initializeApp(configKeys)
firebase
  .firestore()
  .enablePersistence()
  .then(function() {
    // Initialize Cloud Firestore through firebase
   db = firebase.firestore()
  })
  .catch(function(err) {
    if (err.code == 'failed-precondition') {
      // Multiple tabs open, persistence can only be enabled
      // in one tab at a a time.
      // ...
    } else if (err.code == 'unimplemented') {
      // The current browser does not support all of the
      // features required to enable persistence
      // ...
    }
  })

export const config = db.collection('config')
export const forms = config.doc('forms')
export const farms = db.collection('farms')
export const authRef = firebase.auth()
export const provider = new firebase.auth.GoogleAuthProvider()
