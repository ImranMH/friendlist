import firebase from 'firebase'
// Required for side-effects
require("firebase/firestore");

// Initialize Firebase
var config = {
  apiKey: "AIzaSyCyVqqTwpI62Grb-PcxfTyXdu3yKieQkoE",
  authDomain: "testwithvue-24462.firebaseapp.com",
  databaseURL: "https://testwithvue-24462.firebaseio.com",
  projectId: "testwithvue-24462",
  storageBucket: "testwithvue-24462.appspot.com",
  messagingSenderId: "172335638494"
};
firebase.initializeApp(config);

export const rtdb = firebase.database()
export const db = firebase.firestore()
export const auth = firebase.auth()
// Create a root reference
export const storageRef = firebase.storage();

/* new rule from console */
const settings = { /* your settings... */
  timestampsInSnapshots: true
};
db.settings(settings)