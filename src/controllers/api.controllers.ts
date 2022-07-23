import { Request, Response } from 'express';
import axios from 'axios';

const baseUrl = 'https://api-cotacao-b3.labdo.it';

const instance = axios.create({
  baseURL: baseUrl,
  timeout: 20000,
});

const searchAll = async (_req: Request, res: Response) => {
  const result = await instance
    .get('/api/carteira')
    .then((resp) => resp.data)
    .catch((err) => err.message);
  res.status(200).send(result);
};

const searchByName = async (req: Request, res: Response) => {
  const { cod } = req.params;
  const result = await instance
    .get(`/api/cotacao/cd_acao/${cod}`)
    .then((resp) => resp.data)
    .catch((err) => err.message);
  res.status(200).send(result);
};

const searchById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await instance
    .get(`/api/empresa/${id}/cotacoes`)
    .then((resp) => resp.data)
    .catch((err) => err.message);
  res.status(200).send(result);
};

export default {
  searchAll,
  searchByName,
  searchById,
};
