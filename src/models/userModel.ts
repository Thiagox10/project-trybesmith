import { ResultSetHeader } from 'mysql2';
import { IUser, Login, User } from '../interfaces/User';
import connection from './connection';

const create = async (user: IUser): Promise<User> => {
  const { username, classe, level, password } = user;
  const [result] = await connection.execute<ResultSetHeader>(`
  INSERT INTO Trybesmith.Users (username, classe, level, password) 
  VALUES (?, ?, ?, ?) `, [username, classe, level, password]); 
  const { insertId: id } = result;

  const insertedUser: User = { id, username };
  return insertedUser;
};

const login = async (user: Login) => {
  const { username, password } = user;
  const [result] = await connection.execute(`
  SELECT id, username, password FROM Trybesmith.Users 
  WHERE username = ? AND password = ?`, [username, password]); 

  return result as User[];
};

const getById = async (id: number) => {
  const [result] = await connection.execute(`
  SELECT id, username FROM Trybesmith.Users 
  WHERE id = ?`, [id]);
  return result as User[];
};

const getUser = async (id: number, username: string) => {
  const [result] = await connection.execute(`
  SELECT id, username FROM Trybesmith.Users 
  WHERE id = ? AND username = ?`, [id, username]);
  return result as User[];
};

export default {
  create,
  login,
  getById,
  getUser,
};