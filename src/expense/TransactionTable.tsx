import React from "react";
import { Button, ButtonGroup, Stack, Table, Typography } from "@mui/joy";
import { Transaction } from "../common/model";
import { MoneyLabel } from "./MoneyLabel";

interface Props {
  items: Transaction[];
  onEdit: (transaction: Transaction, index: number) => void;
  onDelete: (transaction: Transaction, index: number) => void;
}

export const TransactionTable: React.FC<Props> = (props) => {
  return (
    <Table variant="plain" borderAxis="xBetween">
      <thead>
        <tr>
          <th>Actions</th>
          <th>Date</th>
          <th>Details</th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody>
        {props.items.map((item, index) => {
          return (
            <tr key={index}>
              <td>
                <ButtonGroup>
                  <Button
                    size="sm"
                    color="neutral"
                    onClick={() => {
                      props.onEdit(item, index);
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    color="danger"
                    onClick={() => {
                      props.onDelete(item, index);
                    }}
                  >
                    Delete
                  </Button>
                </ButtonGroup>
              </td>
              <td>{item.isoDate}</td>
              <td>
                <Stack direction={"column"} gap={1}>
                  <Typography level="body-sm">{item.categoryId}</Typography>
                  <Typography level="body-md">{item.label}</Typography>
                </Stack>
              </td>
              <td>
                <MoneyLabel value={item.amount} />
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};
