import Joi from 'joi';
import jwt from 'jsonwebtoken';
import StatusCode from '../enums/StatusCode';
import { IUser, Login } from '../interfaces/User';
import userModel from '../models/userModel';

const schemaUser = Joi.object({
  username: Joi.string().min(3).required().messages({
    'any.required': 'Username is required',
    'string.base': 'Username must be a string',
    'string.min': 'Username must be longer than 2 characters',
  }),
  classe: Joi.string().min(3).required().messages({
    'any.required': 'Classe is required',
    'string.base': 'Classe must be a string',
    'string.min': 'Classe must be longer than 2 characters',
  }),
  level: Joi.number().strict().greater(0).required()
    .messages({
      'any.required': 'Level is required',
      'number.base': 'Level must be a number',
      'number.greater': 'Level must be greater than 0',
    }),
  password: Joi.string().min(8).required().messages({
    'any.required': 'Password is required',
    'string.base': 'Password must be a string',
    'string.min': 'Password must be longer than 7 characters',
  }),
});

const secret = 'xablau';

const jwtConfig: object = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

type Result = {
  status?: number,
  message?: string,
  token?: string,
};

const create = async (user: IUser): Promise<Result> => {
  const { error } = schemaUser.validate(user);

  if (error) {
    if (error.message.includes('required')) {
      return { status: StatusCode.BAD_REQUEST, message: error.message };
    }
    return { status: StatusCode.UNPROCESSABLE_ENTITY, message: error.message };
  }

  const result = await userModel.create(user);
  const token = jwt.sign({ data: result }, secret, jwtConfig);
  return { token };
};

const schemaLogin = Joi.object({
  username: Joi.string().min(3).required().messages({
    'any.required': 'Username is required',
    'string.base': 'Username must be a string',
    'string.min': 'Username must be longer than 2 characters',
  }),
  password: Joi.string().min(8).required().messages({
    'any.required': 'Password is required',
    'string.base': 'Password must be a string',
    'string.min': 'Password must be longer than 7 characters',
  }),
});

const login = async (user: Login): Promise<Result> => {
  const { username } = user;

  const { error } = schemaLogin.validate(user);

  if (error) {
    if (error.message.includes('required')) {
      return { status: StatusCode.BAD_REQUEST, message: error.message };
    }
    return { status: StatusCode.UNPROCESSABLE_ENTITY, message: error.message };
  }

  const result = await userModel.login(user);
  
  if (result.length === 0) {
    return { status: StatusCode.UNAUTHORIZED, message: 'Username or password invalid' };
  }
  const [resultUser] = result;
  const { id } = resultUser;
  const token = jwt.sign({ data: { id, username } }, secret, jwtConfig);
  return { token };
};

export default {
  create,
  login,
};