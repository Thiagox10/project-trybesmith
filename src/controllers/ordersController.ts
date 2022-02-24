import { Request, Response } from 'express';
import ordersService from '../services/ordersService';

const create = async (req: Request, res: Response) => {
  const { products } = req.body;
  const result = ordersService.create();

  return res.status(201).json(result);
};

export default {
  create,
};