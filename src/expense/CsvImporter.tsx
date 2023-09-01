import React, {
  ChangeEventHandler,
  FormEventHandler,
  useContext,
  useState,
} from "react";
import Papa from "papaparse";
import { parseCsvFromKomercniBanka } from "../common/csv";
import { ExpenseContext } from "./ExpenseContext";

export const CsvImporter: React.FC = (props) => {
  const [files, setFiles] = useState<FileList | undefined>();
  const { loadTransactions, setTransactions } = useContext(ExpenseContext);

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    if (event.target.files) {
      setFiles(event.target.files);
    } else {
      setFiles(undefined);
    }
  };

  const handleSubmit: FormEventHandler = (event) => {
    event.preventDefault();
    if (files && files.length > 0) {
      parseCsvFromKomercniBanka(files[0], (importedTransactions) => {
        setTransactions(importedTransactions);
      });
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>React File Upload</h1>
        <input type={"file"} accept={".csv"} onChange={handleChange} />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
};
