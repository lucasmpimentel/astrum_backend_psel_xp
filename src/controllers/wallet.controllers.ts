import { Request, Response } from 'express';
import { IDepositOrder, ITransfer } from '../interfaces/wallet.interfaces';
import walletServices from '../services/wallet.services';
import slipMaker from '../utils/slipMaker';

const getBalance = async (req: Request, res: Response) => {
  const { clientId } = req.params;
  const { user } = req.headers as { user: string };
  const result = await walletServices.getBalance(Number(clientId), user);
  res.status(200).json(result);
};

const deposit = async (req: Request, res: Response) => {
  const operation: ITransfer = req.body;
  const { user } = req.headers as { user: string };
  const result = await walletServices.transfers(operation, user);
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

const makepdf = (req: Request, res: Response) => {
  /* const { pdfOperation } = req.headers as { pdfOperation: string }; */
  const result = walletServices.makepdf(/* pdfOperation */);
  res.status(201).send(result);
}

const pdf = async (req: Request, res: Response) => {
  const pdf = await slipMaker.getPdf();
  res.status(201).contentType('application/pdf').send(pdf);
};

export default {
  getBalance,
  withdraw,
  transfer,
  deposit,
  makepdf,
  pdf,
};
