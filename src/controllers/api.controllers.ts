import { Request, Response } from 'express';
import apiServices from '../services/api.services';

const searchAll = async (_req: Request, res: Response) => {
  const result = await apiServices.searchAll();
  res.status(200).send(result);
};

const searchByName = async (req: Request, res: Response) => {
  const { cod } = req.params;
  const result = await apiServices.searchByName(cod);
  res.status(200).send(result);
};

export default {
  searchAll,
  searchByName,
};
