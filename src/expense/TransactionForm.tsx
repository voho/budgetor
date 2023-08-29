import React, { useEffect, useState } from "react";
import { TransactionTable } from "./TransactionTable";
import { TransactionEditorState } from "../common/model";
import {
  Sheet,
  Input,
  Stack,
  Button,
  FormControl,
  FormLabel,
  Grid,
  Typography,
  ButtonGroup,
  Textarea,
} from "@mui/joy";

interface Props {
  editing?: TransactionEditorState;
  onEditingSubmit: (newState: TransactionEditorState) => void;
  onEditingCancel: () => void;
}

export const TransactionForm: React.FC<Props> = (props) => {
  const [date, setDate] = useState("");
  const [label, setLabel] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [amount, setAmount] = useState(0);
  const [currency, setCurrency] = useState("CZK");
  const isNew = (props.editing?.index ?? -1) < 0;

  useEffect(() => {
    if (props.editing) {
      setDate(props.editing.transaction.isoDate);
      setLabel(props.editing.transaction.label);
      setCategoryId(props.editing.transaction.categoryId);
      setAmount(props.editing.transaction.amount.value);
      setCurrency(props.editing.transaction.amount.currency);
    }
  }, [props.editing]);

  return (
    <Sheet sx={{ p: 2 }}>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          props.onEditingSubmit({
            index: props.editing?.index ?? -1,
            transaction: {
              amount: { value: amount, currency },
              categoryId: categoryId,
              isoDate: date,
              label: label,
            },
          });
        }}
      >
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          spacing={2}
          sx={{ flexGrow: 1 }}
        >
          <Grid xs={8}>
            <Typography level="h4" component="h1">
              {isNew
                ? "New transaction"
                : "Edit transaction #" + props.editing?.index}
            </Typography>
          </Grid>
          <Grid xs={4} textAlign={"right"}>
            <ButtonGroup sx={{ placeContent: "flex-end" }}>
              <Button color="success" type="submit">
                Submit
              </Button>
              <Button
                color="danger"
                onClick={() => {
                  props.onEditingCancel();
                }}
              >
                Cancel
              </Button>
            </ButtonGroup>
          </Grid>
          <Grid xs={4}>
            <FormControl>
              <FormLabel>Date (UTC, ISO)</FormLabel>
              <Input
                placeholder="Date"
                value={date}
                onChange={(e) => {
                  setDate(e.target.value);
                }}
              />
            </FormControl>
          </Grid>
          <Grid xs={4}>
            <FormControl>
              <FormLabel>Category</FormLabel>
              <Input
                placeholder="Category"
                value={categoryId}
                onChange={(e) => {
                  setCategoryId(e.target.value);
                }}
              />
            </FormControl>
          </Grid>
          <Grid xs={4}>
            <FormControl>
              <FormLabel>Amount</FormLabel>
              <Input
                placeholder="Amount"
                endDecorator={currency}
                value={amount}
                onChange={(e) => {
                  setAmount(parseFloat(e.target.value));
                }}
              />
            </FormControl>
          </Grid>
          <Grid xs={12}>
            <FormControl>
              <FormLabel>Label</FormLabel>
              <Textarea
                placeholder="Label"
                minRows={4}
                value={label}
                onChange={(e) => {
                  setLabel(e.target.value);
                }}
              />
            </FormControl>
          </Grid>
        </Grid>
      </form>
    </Sheet>
  );
};
