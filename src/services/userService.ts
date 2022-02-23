import Joi from 'joi';
import User from '../interfaces/User';
import userModel from '../models/userModel';

const schemaUser = Joi.object({
  username: Joi.string().min(2).required(),
  classe: Joi.string().min(2).required(),
  level: Joi.number().greater(0).required(),
  password: Joi.string().min(8).required(),
});

const secret = 'xablau';

// const jwtConfig = {
//   expiresIn: '7d',
//   algorithm: 'HS256',
// };

const create = async (user: User): Promise<object | void> => {
  const { error } = schemaUser.validate(user);

  if (error) return { status: 400, message: error.message };

  const result = await userModel.create(user);
  return result;
};

export default {
  create,
};