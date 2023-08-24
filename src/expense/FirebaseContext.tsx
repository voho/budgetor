import React, { PropsWithChildren } from "react";
import { FirebaseApp, initializeApp } from "@firebase/app";

interface FirebaseContextInterface {
  app?: FirebaseApp;
}

export const DEFAULT_CONTEXT_VALUE: FirebaseContextInterface = {};

export const FirebaseContext = React.createContext<FirebaseContextInterface>(
  DEFAULT_CONTEXT_VALUE,
);

interface Props {}

export const FirebaseContextProvider: React.FC<Props> = (
  props: PropsWithChildren<Props>,
) => {
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

  const app = initializeApp(firebaseConfig);

  return (
    <FirebaseContext.Provider value={{ app }}>
      {props.children}
    </FirebaseContext.Provider>
  );
};
