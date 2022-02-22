import Joi from 'joi';
import User from '../interfaces/User';
import * as userModel from '../models/userModel';

const schemaUser = Joi.object({
  username: Joi.string().min(2).required(),
  classe: Joi.string().min(2).required(),
  level: Joi.number().min(0).required(),
  password: Joi.string().length(8).required(),
});

const create = async (user: User) => {
  const { error } = schemaUser.validate(user);

  if (error) return { status: 400, message: error.message };

  const result = await userModel.create(user);
  return result;
};

export {
  create,
};