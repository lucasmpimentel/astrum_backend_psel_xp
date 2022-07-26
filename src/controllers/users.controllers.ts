import { Request, Response } from 'express';
import userService from '../services/users.services';
import { ILoginEntry } from '../interfaces/users.interfaces';

const login = async (req: Request, res: Response) => {
  const { email, password }: ILoginEntry = req.body;
  const token = await userService.login(email, password);
  res.status(200).json({ token });
};

const getById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { user } = req.headers as { user: string };
  const result = await userService.getById(Number(id), user);
  res.status(200).json(result);
};

const singUp = async (req: Request, res: Response) => {
  const user = req.body;
  const result = await userService.singUp(user);
  res.status(201).json({message: 'Cliente cadastrado com sucesso'})
}

export default {
  login,
  getById,
  singUp
};
