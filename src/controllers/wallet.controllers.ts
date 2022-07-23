import { Request, Response } from 'express';
import { ITransfer } from '../interfaces/wallet.interfaces';
import walletServices from '../services/wallet.services';

const getBalance = async (req: Request, res: Response) => {
  const { clientId } = req.params;
  const { user } = req.headers as { user: string };
  const result = await walletServices.getBalance(Number(clientId), user);
  res.status(200).json(result);
};

const withdraw = async (req: Request, res: Response) => {
  const operation: ITransfer = req.body;
  const { user } = req.headers as { user: string };
  const result = await walletServices.transfers(operation, user);
  res.status(200).json(result);
};

const transfer = async (req: Request, res: Response) => {
  const operation: ITransfer = req.body;
  const { user } = req.headers as { user: string };
  const result = await walletServices.transfers(operation, user);
  res.status(200).json(result);
};

export default {
  getBalance,
  withdraw,
  transfer,
};
