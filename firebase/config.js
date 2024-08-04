import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyANvaL8N0CdZVraOaADuaLvGu0Wa14OU6Q",
    authDomain: "pantrex-624ac.firebaseapp.com",
    projectId: "pantrex-624ac",
    storageBucket: "pantrex-624ac.appspot.com",
    messagingSenderId: "399292873217",
    appId: "1:399292873217:web:032816ae44f0297a009e00",
    measurementId: "G-07XNR53WWQ"
  };

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  
  export { db };