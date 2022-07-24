import { Request, Response } from 'express';
import sharesServices from '../services/shares.services';

const getClientShares = async (req: Request, res: Response) => {
  const { clientId } = req.params;
  const { user } = req.headers as { user: string };
  const result = await sharesServices.getClientShares(Number(clientId), user);
  res.status(200).json(result);
};

const getSharesById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await sharesServices.getSharesById(Number(id));
  res.status(200).json(result);
};

export default {
  getClientShares,
  getSharesById,
};
