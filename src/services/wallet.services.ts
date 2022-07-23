import { ITransfer } from '../interfaces/wallet.interfaces';
import CustomError from '../utils/CustomError';

const sequelizeTransactions = require('../utils/sequelize.transactions');
const { Wallet, User } = require('../database/models');

const getBalance = async (clientId: number, user: string) => {
  const { id, name } = JSON.parse(user);
  if (id !== clientId) throw new CustomError(401, 'Não autorizado');

  const getWallet = await Wallet.findOne({ where: { userId: clientId } });
  const balance = {
    CodCliente: clientId,
    NomeCliente: name,
    Saldo: getWallet.value,
  };
  return balance;
};

const transfers = async (operation: ITransfer, user: string) => {
  const { id } = JSON.parse(user);
  if (id !== operation.userId) throw new CustomError(401, 'Não autorizado');
  console.log('1');
  const getUser = await User.findOne({
    where: { id },
    include: { model: Wallet, as: 'wallets' },
  });
  console.log('2');
  if (getUser.password === operation.password) {
    try {
      const newBalance = (
        Number(getUser.wallets.value) - Number(operation.value)
      ).toFixed(2);

      if (Number(newBalance) > 0) {
        if (operation.op === 'withdraw') {
          const result = sequelizeTransactions.withdraw(
            newBalance,
            getUser,
            operation,
          );
          return result;
        }
        if (operation.op === 'transfer') {
          const getDestination = await Wallet.findOne({
            where: { id: operation.destination },
          });
          const newBalaceDestination = (
            Number(getDestination.value) + Number(operation.value)
          ).toFixed(2);
          const result = sequelizeTransactions.transfer(
            newBalance,
            getUser,
            operation,
            newBalaceDestination,
          );
          return result;
        }
      }
    } catch (err: any) {
      throw new CustomError(500, err.message);
    }
    if (operation.op === 'deposit') {
    }
  }

  throw new CustomError(401, 'Não Autorizado');
};

export default {
  getBalance,
  transfers,
};
