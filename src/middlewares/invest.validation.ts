import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import CustomError from '../utils/CustomError';

const investSchema = Joi.object({
  walletId: Joi.number().required(),
  codAtivo: Joi.string().required(),
  qtdeAtivo: Joi.number().greater(0).required(),
}).messages({
  'any.required': 'Dados incompletos',
  'number.greater': 'Quantidade de ativos deve ser maior que zero',
});

const investValidation = (req: Request, res: Response, next: NextFunction) => {
  const { walletId, codAtivo, qtdeAtivo } = req.body;
  const { error } = investSchema.validate({
    walletId,
    codAtivo,
    qtdeAtivo,
  });

  if (error) throw new CustomError(400, error.message);

  next();
};

export default investValidation;
