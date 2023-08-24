import React, { useContext } from "react";
import { ExpenseByCategoryChart } from "../charts/ExpenseByCategoryChart";
import { ExpenseContext } from "./ExpenseContext";

export const ChartFeature: React.FC = () => {
  const { value } = useContext(ExpenseContext);

  return <ExpenseByCategoryChart transactions={value.transactions} />;
};
