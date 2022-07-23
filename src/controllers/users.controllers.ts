import { Request, Response } from 'express';
import userService from '../services/users.services'
import { ILoginEntry } from '../interfaces/users.interfaces';

const login = async (req: Request, res: Response) => {
  const { email, password }: ILoginEntry = req.body;
  const token = await userService.login(email, password);
  res.status(200).json({ token });
};

const getById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await userService.getById(Number(id));
  res.status(200).json(user);
}

export default {
  login,
  getById
};
