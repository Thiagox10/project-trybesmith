import { Request, Response } from 'express';
import StatusCode from '../enums/StatusCode';
import { IUser, Login } from '../interfaces/User';
import userService from '../services/userService';

const create = async (req: Request, res: Response) => {
  const payload: IUser = req.body;

  const { status, message, token } = await userService.create(payload);
  if (status) return res.status(status).json({ error: message });

  return res.status(StatusCode.CREATED).json({ token });
};

const login = async (req: Request, res: Response) => {
  const payload: Login = req.body;
  const { status, message, token } = await userService.login(payload);

  if (status) return res.status(status).json({ error: message });
  return res.status(200).json({ token });
};

export default {
  create,
  login,
};