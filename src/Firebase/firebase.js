import { auth } from "firebase/app";
import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";
import "firebase/analytics";

var firebaseConfig = {
  apiKey: "AIzaSyA3AU0f35f4B0vKvpruxzYR2vNokwGdWZs",
  authDomain: "todoreactjs-83232.firebaseapp.com",
  databaseURL: "https://todoreactjs-83232.firebaseio.com",
  projectId: "todoreactjs-83232",
  storageBucket: "todoreactjs-83232.appspot.com",
  messagingSenderId: "153497891629",
  appId: "1:153497891629:web:5b8ff1d1daf42c2b8059a4",
  measurementId: "G-MJWSXD3XG3",
};

class Firebase {
  constructor() {
    // if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();

    this.provider = new auth.GoogleAuthProvider();
    this.auth = firebase.auth();
    this.db = firebase.database();
    // }
  }

  signInWithGoogle = () => this.auth.signInWithRedirect(this.provider);

  signInWithGooglePopup = () => this.auth.signInWithPopup(this.provider);

  signOut = () => this.auth.signOut();
}

export default Firebase;