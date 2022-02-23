import User from '../interfaces/User';
import connection from './connection';

const create = async (user: User) => {
  const { username, classe, level, password } = user;
  const [result] = await connection.execute(`
  INSERT INTO Trybesmith.Users (username, classe, level, password) 
  VALUES (?, ?, ?, ?) `, [username, classe, level, password]); 
  return result;
};

export default {
  create,
};