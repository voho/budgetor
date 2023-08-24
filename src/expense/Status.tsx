import { CircularProgress, Sheet } from "@mui/joy";
import React from "react";

interface Props {
  error: string;
  success: boolean;
  loading: boolean;
}

export const Status: React.FC<Props> = (props) => {
  if (props.loading) {
    return (
      <Sheet color="danger" variant="soft" sx={{ p: 2 }}>
        <CircularProgress /> Loading...
      </Sheet>
    );
  }
  if (props.error) {
    return (
      <Sheet color="danger" variant="soft" sx={{ p: 2 }}>
        Error: <b>{props.error}</b>
      </Sheet>
    );
  }
  if (props.success) {
    return (
      <Sheet color="success" variant="soft" sx={{ p: 2 }}>
        Success!
      </Sheet>
    );
  }
  return <></>;
};
