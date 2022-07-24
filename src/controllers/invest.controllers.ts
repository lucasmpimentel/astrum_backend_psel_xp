import { Request, Response } from 'express';
import investServices from '../services/invest.services';

const buy = async (req: Request, res: Response) => {
  const operation = req.body;
  const { user } = req.headers as { user: string };
  const result = await investServices.buy(operation, user);
  res.status(200).json(result);
};

const sell = async (req: Request, res: Response) => {
  const operation = req.body;
  const { user } = req.headers as { user: string };
  const result = await investServices.sell(operation, user);
  res.status(200).json(result);
};

export default {
  buy,
  sell,
};
