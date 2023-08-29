import React from "react";
import Chart from "react-apexcharts";
import { Transaction } from "../common/model";
import { Stack } from "@mui/joy";

interface Props {
  transactions: Transaction[];
}

export const ExpenseByCategoryChart: React.FC<Props> = (props) => {
  const sumByCategpryCost = new Map<string, number>();
  const sumByCategpryIncome = new Map<string, number>();

  props.transactions.forEach((transaction) => {
    if (transaction.amount.value >= 0) {
      if (sumByCategpryIncome.has(transaction.categoryId)) {
        // add
        sumByCategpryIncome.set(
          transaction.categoryId,
          (sumByCategpryIncome.get(transaction.categoryId) ?? 0) +
            transaction.amount.value,
        );
      } else {
        // first
        sumByCategpryIncome.set(
          transaction.categoryId,
          transaction.amount.value,
        );
      }
    } else {
      if (sumByCategpryCost.has(transaction.categoryId)) {
        // add
        sumByCategpryCost.set(
          transaction.categoryId,
          (sumByCategpryCost.get(transaction.categoryId) ?? 0) -
            transaction.amount.value,
        );
      } else {
        // first
        sumByCategpryCost.set(
          transaction.categoryId,
          -transaction.amount.value,
        );
      }
    }
  });

  const seriesIncome: number[] = [];
  const labelsIncome: string[] = [];
  const seriesCost: number[] = [];
  const labelsCost: string[] = [];

  sumByCategpryCost.forEach((value, key) => {
    seriesCost.push(value);
    labelsCost.push(key);
  });

  sumByCategpryIncome.forEach((value, key) => {
    seriesIncome.push(value);
    labelsIncome.push(key);
  });

  return (
    <Stack direction={"column"} gap={1}>
      <Chart
        options={{
          labels: labelsIncome,
          theme: { palette: "pallete2" },
          title: { text: "Income", align: "center" },
          legend: { horizontalAlign: "right", position: "bottom" },
        }}
        series={seriesIncome}
        type="pie"
        width="400"
      />
      <Chart
        options={{
          labels: labelsCost,
          theme: { palette: "pallete10" },
          title: { text: "Expense", align: "center" },
          legend: { horizontalAlign: "right", position: "bottom" },
        }}
        series={seriesCost}
        type="pie"
        width="400"
      />
    </Stack>
  );
};
