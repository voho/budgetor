import { get, ref, set } from "firebase/database";
import { Transaction } from "./model";
import { useCallback, useContext, useState } from "react";
import { FirebaseContext } from "../expense/FirebaseContext";
import { LoginContext } from "../expense/LoginContext";

export const useDatabase = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const { app, db } = useContext(FirebaseContext);
  const { loggedUserId } = useContext(LoginContext);

  const loadTransactions = useCallback(
    (year: number, month: number, callback: (data: Transaction[]) => void) => {
      console.log("inside load", db, loggedUserId);
      if (db && loggedUserId) {
        console.log("load trans", loggedUserId);
        setSuccess(false);
        setError("");
        setLoading(true);
        const rootRef = ref(
          db,
          `users/${loggedUserId}/transactions/${year}/${month}`,
        );
        get(rootRef)
          .then((snapshot) => {
            console.log("snap:", snapshot);
            setSuccess(true);
            callback(snapshot.exists() ? snapshot.val() : []);
          })
          .catch((e) => {
            setError(e.toString());
          })
          .finally(() => {
            setLoading(false);
          });
      }
    },
    [db, loggedUserId],
  );

  const saveTransactions = useCallback(
    (year: number, month: number, transactions: Transaction[]) => {
      if (db && loggedUserId && year && month) {
        setSuccess(false);
        setError("");
        setLoading(true);
        const rootRef = ref(
          db,
          `users/${loggedUserId}/transactions/${year}/${month}`,
        );
        set(rootRef, transactions)
          .then(() => {
            setSuccess(true);
          })
          .catch((e) => {
            setError(e.toString());
          })
          .finally(() => {
            setLoading(false);
          });
      }
    },
    [db, loggedUserId],
  );

  return {
    ready: !!app,
    loadTransactions,
    saveTransactions,
    loading,
    success,
    error,
  };
};
