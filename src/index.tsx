import React from "react";
import { initializeApp } from "firebase/app";
import ReactDOM from "react-dom/client";
import App from "./App";
import "@fontsource/inter";

const firebaseConfig = {
  apiKey: "AIzaSyC_R1s1_Cqctlkd4SbPC1Axk_zHXWhTZMU",
  authDomain: "voho-budgetor.firebaseapp.com",
  databaseURL:
    "https://voho-budgetor-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "voho-budgetor",
  storageBucket: "voho-budgetor.appspot.com",
  messagingSenderId: "762281574346",
  appId: "1:762281574346:web:79552e8307dd3228f35933",
};

initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
