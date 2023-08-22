import React from "react";
import { LoginForm } from "./login/LoginForm";
import { ExpenseContextProvider } from "./expense/ExpenseContext";
import { CssVarsProvider } from "@mui/joy/styles";
import { CssBaseline, Sheet } from "@mui/joy";

function App() {
  return (
    <CssVarsProvider>
      <CssBaseline />
      <ExpenseContextProvider>
        <LoginForm>test</LoginForm>
      </ExpenseContextProvider>
    </CssVarsProvider>
  );
}

export default App;
