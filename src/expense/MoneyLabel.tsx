import React from "react";
import { Money } from "../common/model";
import { Stack, Typography } from "@mui/joy";

interface Props {
  value: Money;
}

export const MoneyLabel: React.FC<Props> = (props) => {
  return (
    <Stack
      direction={"row"}
      gap={1}
      alignItems={"center"}
      justifyContent={"flex-end"}
    >
      <Typography
        fontFamily={"monospace"}
        fontWeight={"bold"}
        level="title-lg"
        color={props.value.value >= 0 ? "success" : "danger"}
      >
        {props.value.value.toFixed(0)}
      </Typography>
      <Typography color="neutral" level="title-sm">
        {props.value.currency}
      </Typography>
    </Stack>
  );
};
