import React, {
  PropsWithChildren,
  useCallback,
  useContext,
  useState,
} from "react";
import { getLocalStorageValue } from "../common/utils";
import {
  Button,
  Input,
  FormControl,
  FormLabel,
  Sheet,
  Stack,
  Typography,
} from "@mui/joy";
import { LoginContext } from "../expense/LoginContext";

interface Props {}

export const LoginForm: React.FC<Props> = (props: PropsWithChildren<Props>) => {
  const [email, setEmail] = useState(getLocalStorageValue("user-email", ""));
  const [password, setPassword] = useState("");
  const { handleLogin, handleLogout, loggedUserName } =
    useContext(LoginContext);

  if (loggedUserName !== "") {
    return (
      <Sheet variant="outlined" sx={{ p: 2 }}>
        <Sheet sx={{ width: "80%", mx: "auto", p: 4 }}>
          <Sheet sx={{ p: 1, mb: 2 }}>
            <Stack
              direction={"row"}
              spacing={2}
              justifyContent="flex-end"
              alignItems="center"
            >
              <Typography color="neutral" level="body-sm">
                Logged user:
              </Typography>
              <Typography color="neutral" level="body-md">
                {loggedUserName}
              </Typography>
              <Button
                size="sm"
                variant="soft"
                onClick={() => {
                  handleLogout();
                }}
              >
                Logout
              </Button>
            </Stack>
          </Sheet>

          {props.children}
        </Sheet>
      </Sheet>
    );
  }

  return (
    <Sheet
      sx={{
        width: 300,
        mx: "auto", // margin left & right
        my: 4, // margin top & bottom
        py: 3, // padding top & bottom
        px: 2, // padding left & right
        display: "flex",
        flexDirection: "column",
        gap: 2,
        borderRadius: "sm",
        boxShadow: "md",
      }}
    >
      <Stack spacing={2}>
        <div>
          <Typography level="h4" component="h1">
            Welcome!
          </Typography>
          <Typography level="body-sm">Sign in to continue.</Typography>
        </div>
        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input
            placeholder="E-mail"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              window.localStorage.setItem(
                "user-email",
                JSON.stringify(e.target.value),
              );
            }}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </FormControl>
        <Button
          type="submit"
          onClick={() => {
            handleLogin(email, password);
          }}
        >
          Login
        </Button>
      </Stack>
    </Sheet>
  );
};
