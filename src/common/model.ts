export interface UserRoot {
  categories: Category[];
  timeRoots: TimeRoot[];
  regularTransactions: Transaction[];
  defaultCurrency: Currency;
}

export interface TimeRoot {
  year: number;
  month: number;
  transactions: Transaction[];
}

export interface Transaction {
  label: string;
  categoryId: string;
  amount: Money;
}

export interface Money {
  value: number;
  currency: Currency;
}

export interface Category {
  id: string;
  label: string;
}

export type Currency = string;
