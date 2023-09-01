import React, { useCallback, useContext, useEffect, useState } from "react";
import { TransactionTable } from "./TransactionTable";
import { Stack, Typography } from "@mui/joy";
import { TransactionEditorState } from "../common/model";
import { ExpenseContext } from "./ExpenseContext";
import { Status } from "./Status";
import { ChartFeature } from "./ChartFeature";
import { TransactionModal } from "./TransactionModal";
import { CsvImporter } from "./CsvImporter";

export const TransactionFeature: React.FC = () => {
  const [editing, setEditing] = useState<TransactionEditorState | undefined>();
  const {
    month,
    year,
    loading,
    success,
    error,
    transactions,
    loadTransactions,
    setTransactions,
  } = useContext(ExpenseContext);

  const onEditingSubmit = useCallback(
    (editing: TransactionEditorState) => {
      if (editing.index < 0) {
        // transaction add
        setTransactions([...(transactions ?? []), editing.transaction]);
        setEditing(undefined);
      } else {
        // transaction update
        const transactionsUpdated = [...(transactions ?? [])];
        transactionsUpdated[editing.index] = editing.transaction;
        setTransactions(transactionsUpdated);
      }
    },
    [setTransactions, transactions],
  );

  const onEditingCancel = useCallback(() => {
    setEditing(undefined);
  }, []);

  useEffect(() => {
    if (year && month) {
      loadTransactions(year, month);
    }
  }, [year, month, loadTransactions]);

  return (
    <Stack direction={"column"} gap={2}>
      <Status error={error} success={success} loading={loading} />
      <TransactionModal
        editing={editing}
        setEditing={setEditing}
        onEditingSubmit={onEditingSubmit}
        onEditingCancel={onEditingCancel}
      />
      <Typography level="body-lg">
        {month} / {year}
      </Typography>
      <Stack direction={"row"} gap={1}>
        <TransactionTable
          items={transactions ?? []}
          onEdit={(transaction, index) => {
            setEditing({ transaction, index });
          }}
          onDelete={(transaction, index) => {
            if (transactions) {
              const transactionsUpdated = [...transactions];
              transactionsUpdated.splice(index, 1);
              setTransactions(transactionsUpdated);
            }
          }}
        />
        <ChartFeature />
      </Stack>
      <CsvImporter />
    </Stack>
  );
};
