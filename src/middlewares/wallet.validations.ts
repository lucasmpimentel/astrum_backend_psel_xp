import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import CustomError from '../utils/CustomError';

const walletSchema = Joi.object({
  userId: Joi.number().required(),
  walletId: Joi.number().required(),
  password: Joi.string().min(6).required(),
  destination: Joi.number().required(),
  value: Joi.number().greater(0).required(),
  op: Joi.string().required(),
}).messages({
  'any.required': 'Dados incompletos',
  'number.greater': 'O valor da transação deve ser maior que zero',
});

const walletValidation = (req: Request, res: Response, next: NextFunction) => {
  const data = req.body;
  const { error } = walletSchema.validate({
    ...data,
  });

  if (error) throw new CustomError(400, error.message);

  next();
};

export default walletValidation;
