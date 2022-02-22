import { Request, Response } from 'express';
import User from '../interfaces/User';
import * as userService from '../services/userService';

const create = async (req: Request, res: Response) => {
  const payload: User = req.body;

  const result = await userService.create(payload);

  res.status(200).json(result);
};

export {
  create,
};