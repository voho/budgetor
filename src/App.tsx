import React from "react";
import { LoginForm } from "./login/LoginForm";
import { ExpenseContextProvider } from "./expense/ExpenseContext";
import { CssVarsProvider } from "@mui/joy/styles";
import { CssBaseline } from "@mui/joy";
import { TransactionFeature } from "./expense/TransactionFeature";
import { LoginContextProvider } from "./expense/LoginContext";
import { FirebaseContextProvider } from "./expense/FirebaseContext";

function App() {
  return (
    <CssVarsProvider>
      <CssBaseline />
      <FirebaseContextProvider>
        <LoginContextProvider>
          <ExpenseContextProvider>
            <LoginForm>
              <TransactionFeature />
            </LoginForm>
          </ExpenseContextProvider>
        </LoginContextProvider>
      </FirebaseContextProvider>
    </CssVarsProvider>
  );
}

export default App;
