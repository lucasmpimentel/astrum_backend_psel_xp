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

const loginValidation = async (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  const { email, password } = req.body;
  const { error } = await loginSchema.validate({ email, password });

  if (error) throw new CustomError(400, error.message);

  next();
};

export default {
  loginValidation,
};
