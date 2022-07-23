import 'dotenv/config';
import jwt, { SignOptions } from 'jsonwebtoken';

export interface IUserToken {
  id: number;
  name: string;
  email: string;
  image: string;
  isActive: boolean;
}

const secret = process.env.JWT_SECRET as string;
export interface IJwtConfig {
  expiresIn: string;
  algorithm: string;
}
const jwtConfig: IJwtConfig = {
  expiresIn: '5d',
  algorithm: 'HS256',
};

const create = (
  id: number,
  name: string,
  email: string,
  image: string,
  isActive: boolean,
): string =>
  jwt.sign({ data: { id, name, email, image, isActive } }, secret, jwtConfig as SignOptions);

const verify = async (token: string) =>
  (await jwt.verify(token, secret)) as { data: IUserToken };

export default {
  create,
  verify,
};
