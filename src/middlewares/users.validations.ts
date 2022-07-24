import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import CustomError from '../utils/CustomError';

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(5).required(),
}).messages({
  'any.required': 'Dados Incompletos',
  'string.min': 'O campo password deve possuir ao menos 6 caracteres',
  'string.email': 'O campo email deve apresentar um email válido',
});

const loginValidation = (req: Request, _res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  const { error } = loginSchema.validate({ email, password });

  if (error) throw new CustomError(400, error.message);

  next();
};

const singUpSchema = Joi.object({
  name: Joi.string().min(3).required(),
  lastname: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  image: Joi.any(),
  isActive: Joi.boolean().required(),
}).messages({
  'any.required': 'Dados incompletos',
  'string.min':
    'Nome e sobrenome precisam de ao menos 3 caracteres e senha ao menos 6 caracteres',
  'string.email': 'Email precisa estar em um formato válido',
});

const singUpValidation = (req: Request, res: Response, next: NextFunction) => {
  const data = req.body;
  const { error } = singUpSchema.validate({
    ...data,
  });

  if (error) throw new CustomError(400, error.message);

  next();
};

export default {
  loginValidation,
  singUpValidation,
};
