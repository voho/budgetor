import React, {
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
} from "react";
import { UserRoot } from "../common/model";
import { useDatabase } from "../common/database";
import { LoginContext } from "./LoginContext";

interface ExpenseContextInterface {
  loading: boolean;
  success: boolean;
  error: string;
  value: UserRoot;
  setValue: (newValue: UserRoot) => void;
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
  transactions: [],
};

export const DEFAULT_CONTEXT_VALUE: ExpenseContextInterface = {
  loading: false,
  success: false,
  error: "",
  value: DEFAULT_VALUE,
  setValue: () => {},
};

export const ExpenseContext = React.createContext<ExpenseContextInterface>(
  DEFAULT_CONTEXT_VALUE,
);

interface Props {}

export const ExpenseContextProvider: React.FC<Props> = (
  props: PropsWithChildren<Props>,
) => {
  const { load, save, data, error, success, loading } = useDatabase();
  const { loggedUserId } = useContext(LoginContext);

  useEffect(() => {
    if (loggedUserId) {
      // initial data load
      load();
    }
  }, [loggedUserId, load]);

  const setValue = useCallback(
    (newValue: UserRoot) => {
      if (loggedUserId) {
        // updates the value in database after change
        save(newValue);
      }
    },
    [loggedUserId, save],
  );

  const contextValue: ExpenseContextInterface = {
    value: data ?? DEFAULT_VALUE,
    setValue,
    error,
    success,
    loading,
  };

  return (
    <ExpenseContext.Provider value={contextValue}>
      {props.children}
    </ExpenseContext.Provider>
  );
};
