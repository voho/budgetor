import React from 'react';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC_R1s1_Cqctlkd4SbPC1Axk_zHXWhTZMU",
  authDomain: "voho-budgetor.firebaseapp.com",
  databaseURL: "https://voho-budgetor-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "voho-budgetor",
  storageBucket: "voho-budgetor.appspot.com",
  messagingSenderId: "762281574346",
  appId: "1:762281574346:web:79552e8307dd3228f35933"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

function App() {
  return (
    <div className="App">
      Hello! {app.name}
    </div>
  );
}

export default App;
