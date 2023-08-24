import React from "react";
import { Button, ButtonGroup, Table } from "@mui/joy";
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
          <th>Date</th>
          <th>Label</th>
          <th>Category</th>
          <th>Amount</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {props.items.map((item, index) => {
          return (
            <tr key={index}>
              <td>{item.isoDate}</td>
              <td>{item.label}</td>
              <td>{item.categoryId}</td>
              <td>
                <MoneyLabel value={item.amount} />
              </td>
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
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};
