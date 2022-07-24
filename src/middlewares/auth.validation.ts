import { Request, Response, NextFunction } from 'express';
import tokenUtils, { IUserToken } from '../utils/token.utils';
import CustomError from '../utils/CustomError';

const authByToken = async (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  const { authorization } = req.headers as { authorization: string };

  if (authorization) {
    try {
      const { data } = (await tokenUtils.verify(authorization)) as {
        data: IUserToken;
      };
      req.headers.user = JSON.stringify(data);
      return next();
    } catch (error) {
      throw new CustomError(401, 'Token inválido');
    }
  }
  throw new CustomError(401, 'Token não encontrado');
};

export default authByToken;
