import React, {
  PropsWithChildren,
  useCallback,
  useContext,
  useState,
} from "react";
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";
import { FirebaseContext } from "./FirebaseContext";

interface LoginContextInterface {
  loading: boolean;
  loggedUserId?: string;
  loggedUserName?: string;
  handleLogin: (email: string, password: string) => void;
  handleLogout: () => void;
}

export const DEFAULT_CONTEXT_VALUE: LoginContextInterface = {
  loading: false,
  handleLogin: () => {},
  handleLogout: () => {},
};

export const LoginContext = React.createContext<LoginContextInterface>(
  DEFAULT_CONTEXT_VALUE,
);

interface Props {}

export const LoginContextProvider: React.FC<Props> = (
  props: PropsWithChildren<Props>,
) => {
  const [loggedUserId, setLoggedUserId] = useState("");
  const [loggedUserName, setLoggedUserName] = useState("");
  const [loading, setLoading] = useState(false);
  const { app } = useContext(FirebaseContext);

  const handleLogin = useCallback(
    (email: string, password: string) => {
      const auth = getAuth(app);
      setLoading(true);
      setPersistence(auth, browserLocalPersistence);
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          setLoading(false);
          setLoggedUserId(userCredential.user.uid);
          setLoggedUserName(
            userCredential.user.displayName ??
              userCredential.user.email ??
              userCredential.user.uid,
          );
        })
        .catch((error) => {
          console.error(error);
          setLoading(false);
          setLoggedUserId("");
          setLoggedUserName("");
        });
    },
    [app],
  );

  const handleLogout = useCallback(() => {
    const auth = getAuth(app);
    signOut(auth)
      .then(() => {
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  }, [app]);

  const contextValue: LoginContextInterface = {
    handleLogin,
    handleLogout,
    loading,
    loggedUserId,
    loggedUserName,
  };

  return (
    <LoginContext.Provider value={contextValue}>
      {props.children}
    </LoginContext.Provider>
  );
};
