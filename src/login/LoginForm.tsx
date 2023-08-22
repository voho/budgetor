import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";
import React, { PropsWithChildren, useCallback, useState } from "react";
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

interface Props {}

export const LoginForm: React.FC<Props> = (props: PropsWithChildren<Props>) => {
  const [email, setEmail] = useState(getLocalStorageValue("user-email", ""));
  const [password, setPassword] = useState("");
  const [loggedUser, setLoggedUser] = useState("");

  const handleLogin = useCallback(() => {
    const auth = getAuth();
    setPersistence(auth, browserLocalPersistence);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setLoggedUser(
          userCredential.user.displayName ??
            userCredential.user.email ??
            userCredential.user.uid,
        );
      })
      .catch((error) => {
        console.error(error);
        setLoggedUser("");
      });
  }, [email, password]);

  const handleLogout = useCallback(() => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  if (loggedUser !== "") {
    return (
      <Sheet variant="solid" sx={{ p: 2 }}>
        <Sheet color={"neutral"} sx={{ width: "80%", mx: "auto", p: 4 }}>
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
                {loggedUser}
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
            handleLogin();
          }}
        >
          Login
        </Button>
      </Stack>
    </Sheet>
  );
};
