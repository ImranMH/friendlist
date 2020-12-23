import firebase from 'firebase'
// Required for side-effects
import "firebase/firestore";

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
export const provider = new firebase.auth.FacebookAuthProvider();
export const  googleProvider = new firebase.auth.GoogleAuthProvider();


firebase.auth().languageCode = 'fr_FR';
provider.addScope('email');
provider.setCustomParameters({
  'display': 'popup'
});

firebase.auth().signInWithPopup(provider).then(function(result) {
  // This gives you a Facebook Access Token. You can use it to access the Facebook API.
  var token = result.credential.accessToken;
  // The signed-in user info.
  var user = result.user;
  console.log(token)
  console.log(user)
  // ...
}).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // The email of the user's account used.
  var email = error.email;
  // The firebase.auth.AuthCredential type that was used.
  var credential = error.credential;
  console.log(errorCode, email, credential, errorMessage)
  // ...
});

/* new rule from console for firestore  */
const settings = { /* your settings... */
  timestampsInSnapshots: true
};
db.settings(settings)