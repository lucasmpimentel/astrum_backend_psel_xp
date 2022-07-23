import tokenUtils from '../utils/token.utils';
import CustomError from '../utils/CustomError';
import { IUserDB } from '../interfaces/users.interfaces';

const { User, Wallet, userShares } = require('../database/models');

const login = async (email: string, password: string) => {
  const getUser = await User.findOne({ where: { email } });

  if (!getUser) throw new CustomError(401, 'Usuário inexistente');

  if (getUser.email === email && getUser.password === password) {
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

export default {
  login,
  getById,
};
