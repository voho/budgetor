import Papa, { LocalFile } from "papaparse";
import { Money, Transaction } from "./model";

const parseKbDate = (csvDate: string): string => {
  const parts = csvDate.split(".", 3);
  return [parts[2], parts[1], parts[0]].join("-");
};

const parseKbAmount = (csvAount: string): Money => {
  return {
    value: parseFloat(csvAount.replace(",", ".")),
    currency: "CZK",
  };
};

export const parseCsvFromKomercniBanka = (
  file: LocalFile,
  handle: (transactions: Transaction[]) => void,
) => {
  const transactions: Transaction[] = [];
  let headerSkipped = false;

  Papa.parse(file, {
    encoding: "ISO-8859-2",
    worker: true,
    skipEmptyLines: true,
    step: function (row) {
      if (Array.isArray(row.data) && (row.data as string[]).length === 20) {
        // skip header
        if (!headerSkipped) {
          headerSkipped = true;
          return;
        }
        // this is a data row
        const csvDate = row.data[0] as string;
        const amount = row.data[4] as string;
        const otherAccount = row.data[2] as string;
        const vs = row.data[8] as string;
        const ks = row.data[9] as string;
        const ss = row.data[10] as string;
        const id = row.data[11] as string;
        const myNote = row.data[13] as string;
        const otherNote = row.data[14] as string;
        const av1 = row.data[15] as string;
        const av2 = row.data[16] as string;
        const av3 = row.data[17] as string;
        const av4 = row.data[18] as string;

        const transaction: Transaction = {
          isoDate: parseKbDate(csvDate),
          amount: parseKbAmount(amount),
          categoryId: otherAccount,
          label: [myNote, otherNote, av1, av2, av3, av4].join("; "),
        };

        transactions.push(transaction);
      }
    },
    complete: function () {
      handle(transactions);
    },
  });
};
