import firebase from 'firebase'
import configKeys from './configFirebase'

firebase.initializeApp(configKeys)

export default firebase
