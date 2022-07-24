import { IDepositOrder, ITransfer } from '../interfaces/wallet.interfaces';
import CustomError from '../utils/CustomError';
import slipMaker from '../utils/slipMaker';

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

  const getUser = await User.findOne({
    where: { id },
    include: { model: Wallet, as: 'wallets' },
  });

  if (operation.op === 'deposit') {
    const newBalance = (
      Number(getUser.wallets.value) + Number(operation.value)
    ).toFixed(2);
    return {
      name: getUser.name,
      lastname: getUser.lastname,
      email: getUser.email,
      walletId: getUser.wallets.id,
      operation: operation.op,
      value: operation.value,
      newBalance,
    };
  }

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
  }

  throw new CustomError(401, 'Não Autorizado');
};

const makepdf = (/* pdfOperation: string */) => {
 /*  const operation: IDepositOrder = JSON.parse(pdfOperation); */
  const result = slipMaker.makepdf(/* operation */)
};

export default {
  getBalance,
  transfers,
  makepdf,
};
