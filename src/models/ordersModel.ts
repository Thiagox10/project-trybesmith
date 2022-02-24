import { ResultSetHeader } from 'mysql2';
import connection from './connection';

const create = async (userId: number) => {
  const [result] = await connection.execute<ResultSetHeader>(`
  INSERT INTO Trybesmith.Orders (userId) 
  VALUES (?);`, [userId]); 
  // const { insertId: id } = result;
  // const insertedProduct: Product = { item: {
  //   id,
  //   name,
  //   amount,
  // } };
  return result;
};

export default {
  create,
};