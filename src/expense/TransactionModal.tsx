import {
  Modal,
  ModalDialog,
  ModalClose,
  Typography,
  Button,
  Stack,
} from "@mui/joy";
import React, { useCallback, useEffect, useState } from "react";
import { TransactionForm } from "./TransactionForm";
import { TransactionEditorState } from "../common/model";

interface Props {
  editing?: TransactionEditorState;
  setEditing: (newState: TransactionEditorState) => void;
  onEditingSubmit: (newState: TransactionEditorState) => void;
  onEditingCancel: () => void;
}

export const TransactionModal: React.FC<Props> = (props) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (props.editing) {
      setOpen(true);
    }
  }, [props.editing]);

  const onNewClick = useCallback(() => {
    props.setEditing({
      index: -1,
      transaction: {
        amount: { currency: "CZK", value: 0 },
        categoryId: "",
        isoDate: "2023-",
        label: "",
      },
    });
    setOpen(true);
  }, [props]);

  return (
    <>
      <Stack direction={"row"}>
        <Button onClick={onNewClick} color="primary">
          Add Transaction
        </Button>
      </Stack>
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog>
          <TransactionForm
            editing={props.editing}
            onEditingSubmit={(data) => {
              props.onEditingSubmit(data);
              setOpen(false);
            }}
            onEditingCancel={() => {
              props.onEditingCancel();
              setOpen(false);
            }}
          />
        </ModalDialog>
      </Modal>
    </>
  );
};
