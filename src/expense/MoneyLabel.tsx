import React from "react";
import { Money } from "../common/model";

interface Props {
  value: Money;
}

export const MoneyLabel: React.FC<Props> = (props) => {
  return (
    <pre
      className={props.value.value >= 0 ? "money-positive" : "money-negative"}
    >
      {props.value.value.toFixed(2)} {props.value.currency}
    </pre>
  );
};
