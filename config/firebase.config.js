import { initializeApp } from "firebase/app";
import { getDatabase } from 'firebase/database';
import firebase from 'firebase/compat/app'
import 'firebase/compat/storage'

export const firebaseConfig = {
    apiKey: "AIzaSyCeJIpUGAon5mn3FPuOffPadryOqDwgXk0",
    authDomain: "testfirebase-4510c.firebaseapp.com",
    projectId: "testfirebase-4510c",
    storageBucket: "testfirebase-4510c.appspot.com",
    messagingSenderId: "69784032837",
    appId: "1:69784032837:web:241d3a318daa69b16df52c"
}

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
}

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export {app, firebase}