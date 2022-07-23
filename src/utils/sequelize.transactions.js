const Sequelize = require('sequelize');
const config = require('../database/config/config');
const CustomError = require('./CustomError');
const { Wallet, Transaction } = require('../database/models');

const withdraw = async (newBalance, getUser, operation) => {
  const sequelize = new Sequelize(config.development);
  const { wallets, id } = getUser;
  const { value } = wallets;

  try {
    const result = await sequelize.transaction(async (transaction) => {
      const newTransaction = Transaction.create(
        {
          userId: id,
          walletId: wallets.id,
          destination: null,
          value: operation.value,
        },
        { transaction },
      );
      await Wallet.update(
        { value: Number(newBalance) },
        { where: { value }, transaction },
      );
      return newTransaction
    });
    return result;
  } catch (err) {
    throw new CustomError(500, 'Falha na gravação de dados');
  }
};

const transfer = async (
  newBalance,
  getUser,
  operation,
  newBalanceDestination,
) => {
  const sequelize = new Sequelize(config.development);
  const { wallets, id } = getUser;
  const { value } = wallets;

  try {
    const result = await sequelize.transaction(async (transaction) => {
      const newTransaction = Transaction.create(
        {
          userId: id,
          walletId: wallets.id,
          destination: operation.destination,
          value: operation.value,
        },
        { transaction },
      );
      await Wallet.update(
        { value: Number(newBalance) },
        { where: { value, userId: id }, transaction },
      );
      await Wallet.update(
        { value: Number(newBalanceDestination) },
        { where: { id: operation.destination }, transaction },
      );
      return newTransaction
    });
    return result
  } catch (err) {
    throw new CustomError(500, 'Falha na gravação de dados');
  }
};

module.exports = {
  withdraw,
  transfer,
};
