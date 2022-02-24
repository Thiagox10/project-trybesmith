export interface IProduct {
  name: string;
  amount: string;
}

export interface Product {
  item: {
    id: number;
    name: string;
    amount: string;
  }
}