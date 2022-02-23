import { Request, Response } from 'express';
import User from '../interfaces/User';
import userService from '../services/userService';

const create = async (req: Request, res: Response) => {
  const payload: User = req.body;

  const result = await userService.create(payload);
  // const error = result.message;
  if (result.message) return res.status(result.status).json({ error: result.message });

  res.status(422).json('token');
};

export default {
  create,
};