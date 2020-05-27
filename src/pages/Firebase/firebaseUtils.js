import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyCBVG_wN-vl2MtuWjwXcDu9lePjQzLPeIQ",
    authDomain: "blog-react-e25f1.firebaseapp.com",
    databaseURL: "https://blog-react-e25f1.firebaseio.com",
    projectId: "blog-react-e25f1",
    storageBucket: "blog-react-e25f1.appspot.com",
    messagingSenderId: "331021596547",
    appId: "1:331021596547:web:765b7d4afe6062d3e528b6",
    measurementId: "G-DVFETE0LV6"
};

export const firebaseImpl = firebase.initializeApp(config);
export const firebaseDatabase = firebase.database();
export const firebaseStorage = firebase.storage();
export const firebaseAuth = firebase.auth();