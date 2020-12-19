import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

var firebaseConfig = {
  apiKey: "AIzaSyByRzoypLiyag2wbVmdmzOHnOlfGpmJtvs",
  authDomain: "gamelobby-78d68.firebaseapp.com",
  databaseURL:
    "https://gamelobby-78d68-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "gamelobby-78d68",
  storageBucket: "gamelobby-78d68.appspot.com",
  messagingSenderId: "545623729131",
  appId: "1:545623729131:web:8e508f27b39b3430e72fae",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const projectFirestore = firebase.firestore();

const auth = firebase.auth();

export { projectFirestore, auth };
