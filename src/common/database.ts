import { getDatabase, onValue, ref, set } from "firebase/database";
import { UserRoot } from "./model";
import { getAuth } from "firebase/auth";
import { useCallback, useContext, useState } from "react";
import { DEFAULT_VALUE } from "../expense/ExpenseContext";
import { FirebaseContext } from "../expense/FirebaseContext";

export const useDatabase = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [data, setData] = useState<UserRoot | undefined>();
  const { app } = useContext(FirebaseContext);

  const load = useCallback(() => {
    const auth = getAuth(app);
    const db = getDatabase(app);
    const uid = auth.currentUser?.uid;
    setSuccess(false);
    setError("");
    setLoading(true);
    if (uid) {
      const rootRef = ref(db, "users/" + uid);
      onValue(rootRef, (snapshot) => {
        const data = snapshot.exists()
          ? (snapshot.val() as UserRoot)
          : DEFAULT_VALUE;
        if (data.transactions === undefined) {
          data.transactions = [];
        }
        setData(data);
        setSuccess(true);
        setLoading(false);
      });
    }
  }, [app]);

  const save = useCallback(
    (newValue: UserRoot) => {
      const auth = getAuth(app);
      const db = getDatabase(app);
      const uid = auth.currentUser?.uid;
      setSuccess(false);
      setError("");
      setLoading(true);
      if (uid) {
        const rootRef = ref(db, "users/" + uid);
        set(rootRef, newValue);
        setData(newValue);
        setSuccess(true);
        setLoading(false);
      }
    },
    [app],
  );

  return {
    ready: !!app,
    save,
    load,
    data,
    loading,
    success,
    error,
  };
};
