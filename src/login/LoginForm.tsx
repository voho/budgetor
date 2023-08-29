import React, { PropsWithChildren, useContext, useState } from "react";
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
  const { handleLogin, handleLogout, loggedUserName, loading, error } =
    useContext(LoginContext);

  if (loggedUserName !== "") {
    return (
      <Sheet variant="outlined" sx={{ p: 4 }}>
        <Sheet sx={{ mx: "auto", p: 4 }}>
          <Sheet sx={{ mb: 2 }}>
            <Stack
              direction={"row"}
              spacing={1}
              justifyContent={"space-between"}
            >
              <Typography level="h1">Budgetor</Typography>
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
        mx: "auto",
        my: 4,
        p: 2,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        borderRadius: "sm",
        boxShadow: "md",
      }}
    >
      <Stack spacing={2}>
        <Stack direction={"column"} gap={1}>
          <Typography level="h4">Welcome to Budgetor!</Typography>
          <Typography level="body-sm">
            Please sign in to continue. The app is crap anyway, so if you do not
            have any account, you are not missing out...
          </Typography>
        </Stack>
        <FormControl>
          <FormLabel>E-mail</FormLabel>
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
          <FormLabel>Password</FormLabel>
          <Input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </FormControl>
        {error && (
          <Typography
            borderRadius={5}
            p={1}
            variant="solid"
            level="body-sm"
            color="danger"
          >
            {error && error.message ? error.message : JSON.stringify(error)}
          </Typography>
        )}
        <Button
          type="submit"
          loading={loading}
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
