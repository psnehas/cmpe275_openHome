import firebase from "firebase";
import "firebase/storage";

// Initialize Firebase
const config = {
  apiKey: "AIzaSyDSRg7mbfgVEQG6Bfh1DAnNmUHW6cvJEwE",
  authDomain: "openhome275-9ad6a.firebaseapp.com",
  databaseURL: "https://openhome275-9ad6a.firebaseio.com",
  projectId: "openhome275-9ad6a",
  storageBucket: "openhome275-9ad6a.appspot.com",
  messagingSenderId: "529460311916",
  appId: "1:529460311916:web:ee132a22fefe89b789a549",
  measurementId: "G-9F1ZHG3DY0"
};
firebase.initializeApp(config);

const storage = firebase.storage();

export { storage, firebase as default };
