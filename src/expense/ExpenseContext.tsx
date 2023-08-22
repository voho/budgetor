import React, {
  PropsWithChildren,
  useCallback,
  useEffect,
  useState,
} from "react";
import { UserRoot } from "../common/model";
import { loadUserRoot, saveUserRoot } from "../common/database";

interface ExpenseContextInterface {
  value: UserRoot;
  setValue: (oldValue: UserRoot) => void;
  save: () => void;
}

export const DEFAULT_VALUE: UserRoot = {
  categories: [
    { id: "energy", label: "Energy" },
    { id: "home", label: "Mortgage/Rent" },
    { id: "comm", label: "Communication" },
    { id: "subs", label: "Subscriptions" },
    { id: "food", label: "Food" },
    { id: "shop", label: "Shopping" },
    { id: "fun", label: "Fun" },
    { id: "travel", label: "Travel" },
    { id: "edu", label: "Education" },
    { id: "car", label: "Car" },
    { id: "insurance", label: "Insurance" },
    { id: "repay", label: "Repayment" },
    { id: "invest", label: "Investment" },
    { id: "income", label: "Income" },
  ],
  defaultCurrency: "CZK",
  regularTransactions: [],
  timeRoots: [],
};

export const DEFAULT_CONTEXT_VALUE: ExpenseContextInterface = {
  value: DEFAULT_VALUE,
  setValue: () => {},
  save: () => {},
};

export const ExpenseContext = React.createContext<ExpenseContextInterface>(
  DEFAULT_CONTEXT_VALUE,
);

interface Props {}

export const ExpenseContextProvider: React.FC<Props> = (
  props: PropsWithChildren<Props>,
) => {
  const [value, setValueState] = useState(DEFAULT_VALUE);
  const [error, setError] = useState("");

  console.log("expense context");

  useEffect(() => {
    // initial data load
    console.log("initial load");
    setError("");
    loadUserRoot()
      .then((root) => {
        console.log("fetched", root);
        if (root === null) {
          setValueState(DEFAULT_VALUE);
          setError("");
        } else {
          setValueState(root);
          setError("");
        }
      })
      .catch((error) => {
        console.log("error", error);
        setError(error.toString());
      });
  }, []);

  const setValue = useCallback((newValue: UserRoot) => {
    // updates the value in database after change
    setValueState(newValue);
    saveUserRoot(newValue);
  }, []);

  const save = useCallback(() => {
    console.log("saving", value);
    saveUserRoot(value);
  }, [value]);

  const contextValue = {
    value,
    setValue,
    save,
  };

  return (
    <ExpenseContext.Provider value={contextValue}>
      {props.children}
    </ExpenseContext.Provider>
  );
};
