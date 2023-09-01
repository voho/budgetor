import React, { useContext } from "react";
import { ExpenseByCategoryChart } from "../charts/ExpenseByCategoryChart";
import { ExpenseContext } from "./ExpenseContext";

export const ChartFeature: React.FC = () => {
  const { transactions } = useContext(ExpenseContext);

  return <ExpenseByCategoryChart transactions={transactions ?? []} />;
};
