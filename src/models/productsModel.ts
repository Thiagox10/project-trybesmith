import { ResultSetHeader } from 'mysql2';
import { IProduct, Product } from '../interfaces/Product';
import connection from './connection';

const create = async (product: IProduct) => {
  const { name, amount } = product;
  const [result] = await connection.execute<ResultSetHeader>(`
  INSERT INTO Trybesmith.Products (name, amount) 
  VALUES (?, ?);`, [name, amount]); 
  const { insertId: id } = result;
  const insertedProduct: Product = { item: {
    id,
    name,
    amount,
  } };
  return insertedProduct;
};

export default {
  create,
};