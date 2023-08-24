export interface UserRoot {
  categories: Category[];
  transactions: Transaction[];
  defaultCurrency: string;
}

export interface Transaction {
  isoDate: string;
  label: string;
  categoryId: string;
  amount: Money;
}

export interface Money {
  value: number;
  currency: string;
}

export interface Category {
  id: string;
  label: string;
}

export interface TransactionEditorState {
  transaction: Transaction;
  index: number;
}
