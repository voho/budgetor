import React, { useCallback, useContext, useState } from "react";
import { TransactionTable } from "./TransactionTable";
import { Stack } from "@mui/joy";
import { TransactionEditorState } from "../common/model";
import { ExpenseContext } from "./ExpenseContext";
import { Status } from "./Status";
import { ChartFeature } from "./ChartFeature";
import { TransactionModal } from "./TransactionModal";

export const TransactionFeature: React.FC = () => {
  const [editing, setEditing] = useState<TransactionEditorState | undefined>();
  const { value, setValue, loading, success, error } =
    useContext(ExpenseContext);

  const onEditingSubmit = useCallback(
    (editing: TransactionEditorState) => {
      if (editing.index < 0) {
        // transaction add
        setValue({
          ...value,
          transactions: [...value.transactions, editing.transaction],
        });
        // reset form
        setEditing(undefined);
      } else {
        // transaction update
        const transactionsUpdated = [...value.transactions];
        transactionsUpdated[editing.index] = editing.transaction;
        setValue({ ...value, transactions: transactionsUpdated });
      }
    },
    [setValue, value],
  );

  const onEditingCancel = useCallback(() => {
    setEditing(undefined);
  }, []);

  return (
    <Stack direction={"column"} gap={2}>
      <Status error={error} success={success} loading={loading} />
      <TransactionModal
        editing={editing}
        setEditing={setEditing}
        onEditingSubmit={onEditingSubmit}
        onEditingCancel={onEditingCancel}
      />
      <Stack direction={"row"} gap={1}>
        <TransactionTable
          items={value.transactions}
          onEdit={(transaction, index) => {
            setEditing({ transaction, index });
          }}
          onDelete={(transaction, index) => {
            const transactionsUpdated = [...value.transactions];
            transactionsUpdated.splice(index, 1);
            setValue({ ...value, transactions: transactionsUpdated });
          }}
        />
        <ChartFeature />
      </Stack>
    </Stack>
  );
};
