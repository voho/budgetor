import React, {
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { Transaction } from "../common/model";
import { useDatabase } from "../common/database";
import { LoginContext } from "./LoginContext";
import { stableSort } from "../common/transactions";

interface ExpenseContextInterface {
  loading: boolean;
  success: boolean;
  error: string;
  transactions?: Transaction[];
  setTransactions: (transactions: Transaction[]) => void;
  loadTransactions: (year: number, month: number) => void;
  year?: number;
  month?: number;
  setMonth: (m: number) => void;
  setYear: (y: number) => void;
}

export const DEFAULT_CONTEXT_VALUE: ExpenseContextInterface = {
  loading: false,
  success: false,
  error: "",
  setMonth: () => {},
  setYear: () => {},
  setTransactions: () => {},
  loadTransactions: () => {},
};

export const ExpenseContext = React.createContext<ExpenseContextInterface>(
  DEFAULT_CONTEXT_VALUE,
);

interface Props {}

export const ExpenseContextProvider: React.FC<Props> = (
  props: PropsWithChildren<Props>,
) => {
  const { loadTransactions, saveTransactions, error, success, loading } =
    useDatabase();
  const { loggedUserId } = useContext(LoginContext);
  const [transactions, setTransactions] = useState<Transaction[] | undefined>();
  const [month, setMonth] = useState(8);
  const [year, setYear] = useState(2023);

  const setAndSaveTransactions = useCallback(
    (newTransaction: Transaction[]) => {
      if (loggedUserId && year && month) {
        setTransactions(newTransaction);
        saveTransactions(year, month, newTransaction);
      }
    },
    [loggedUserId, month, saveTransactions, year],
  );

  const loadTransactionsInner = useCallback(() => {
    loadTransactions(year, month, (data) => {
      setTransactions(
        stableSort(data, (a, b) => {
          return a.isoDate.localeCompare(b.isoDate);
        }),
      );
    });
  }, [loadTransactions, month, year]);

  const contextValue: ExpenseContextInterface = {
    error,
    success,
    loading,
    transactions,
    month,
    year,
    setYear,
    setMonth,
    loadTransactions: loadTransactionsInner,
    setTransactions: setAndSaveTransactions,
  };

  return (
    <ExpenseContext.Provider value={contextValue}>
      {props.children}
    </ExpenseContext.Provider>
  );
};
