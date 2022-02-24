import Joi from 'joi';
import StatusCode from '../enums/StatusCode';
import { IProduct } from '../interfaces/Product';
import { ResultError } from '../interfaces/ResultError';
import productsModel from '../models/productsModel';

const schemaProduct = Joi.object({
  name: Joi.string().min(3).messages({
    'string.base': 'Name must be a string',
    'string.min': 'Name must be longer than 2 characters',
  }),
  amount: Joi.string().min(3).messages({
    'string.base': 'Amount must be a string',
    'string.min': 'Amount must be longer than 2 characters',
  }),
});

const create = async (product: IProduct): Promise<ResultError> => {
  const { error } = schemaProduct.validate(product);

  if (error) {
    return { status: StatusCode.UNPROCESSABLE_ENTITY, message: error.message } as ResultError;
  }

  const result = await productsModel.create(product);
  return { result };
};

const getAll = async () => {
  const result = await productsModel.getAll();
  return result;
};

export default {
  create,
  getAll,
};