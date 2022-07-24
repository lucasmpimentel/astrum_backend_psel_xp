import bcrypt from 'bcryptjs';
import tokenUtils from '../utils/token.utils';
import CustomError from '../utils/CustomError';
import { IUserSingUp } from '../interfaces/users.interfaces';

const { User, Wallet } = require('../database/models');
const sequelizeTransactions = require('../utils/sequelize.transactions')

const SALT = 10;

const login = async (email: string, password: string) => {
  const getUser = await User.findOne({ where: { email } });

  if (!getUser) throw new CustomError(401, 'Usuário inexistente');

  const matchPass = bcrypt.compareSync(
    password,
    getUser.password);
  
  if (getUser.email === email && matchPass) {
    const token = tokenUtils.create(
      getUser.id,
      getUser.name,
      getUser.email,
      getUser.image,
      getUser.isActive,
    );
    return token;
  }

  throw new CustomError(401, 'Email ou senha inválidos');
};

const getById = async (id: number, user: string) => {
  const { id: clientId } = JSON.parse(user);
  if (clientId !== id) throw new CustomError(401, 'Não autorizado!');

  const getUser = await User.findOne({
    where: { id },
    include: { model: Wallet, as: 'wallets' },
  });

  if (!getUser) throw new CustomError(404, 'Cliente não encontrado');

  const { id: userId, name, lastname, email, image } = getUser;
  const { value } = getUser.wallets;
  const client = {
    CodCliente: userId,
    Saldo: value,
    name,
    lastname,
    email,
    image,
  };

  return client;
};

const singUp = async (user: IUserSingUp) => {
  const searchDB = await User.findOne({ where: { email: user.email } });
  if (searchDB || searchDB?.length > 0)
    throw new CustomError(409, 'Usuário ja cadastrado');
  
  const hashPass = bcrypt.hashSync(user.password, SALT)

  try {
    await sequelizeTransactions.singUp(user, hashPass)
  } catch (err: any) {
    throw new CustomError(500, err.message)
  }
  throw new CustomError(500, 'Erro ao cadastrar');
};

export default {
  login,
  getById,
  singUp,
};
