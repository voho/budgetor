import React, { Component } from "react";
import Chart from "react-apexcharts";
import { Transaction } from "../common/model";

interface Props {
  transactions: Transaction[];
}

export const ExpenseByCategoryChart: React.FC<Props> = (props) => {
  const sumByCategpry = new Map<string, number>();
  props.transactions.forEach((transaction) => {
    if (sumByCategpry.has(transaction.categoryId)) {
      // add
      sumByCategpry.set(
        transaction.categoryId,
        (sumByCategpry.get(transaction.categoryId) ?? 0) +
          transaction.amount.value,
      );
    } else {
      // first
      sumByCategpry.set(transaction.categoryId, transaction.amount.value);
    }
  });

  const series: number[] = [];
  const labels: string[] = [];

  sumByCategpry.forEach((value, key) => {
    series.push(value);
    labels.push(key);
  });

  const state = {
    options: {
      labels,
    },
    series,
  };

  return (
    <Chart
      options={state.options}
      series={state.series}
      type="donut"
      width="500"
    />
  );
};
