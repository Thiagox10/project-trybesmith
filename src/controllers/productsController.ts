import { Request, Response } from 'express';
import StatusCode from '../enums/StatusCode';
import { IProduct } from '../interfaces/Product';
import productsService from '../services/productsService';

const create = async (req: Request, res: Response) => {
  const payload: IProduct = req.body;

  if (!payload.name) {
    return res.status(StatusCode.BAD_REQUEST).json({ error: 'Name is required' });
  }

  if (!payload.amount) {
    return res.status(StatusCode.BAD_REQUEST).json({ error: 'Amount is required' });
  }
  const { status, message, result } = await productsService.create(payload);

  if (status) {
    return res.status(status).json({ error: message });
  }

  return res.status(StatusCode.CREATED).json(result);
};

const getAll = async (req: Request, res: Response) => {
  const result = await productsService.getAll();
  return res.status(200).json(result);
};

export default {
  create,
  getAll,
};