import { Request, Response } from 'express';
import sharesServices from '../services/shares.services';

const getClientShares = async (req: Request, res: Response) => {
  const { clientId } = req.params;
  const { user } = req.headers as { user: string };
  const result = await sharesServices.getClientShares(Number(clientId), user);
  res.status(200).json(result);
};

export default {
  getClientShares,
};
