const Sequelize = require('sequelize');
const config = require('../database/config/config');
const CustomError = require('./CustomError');
const {
  Wallet,
  Transaction,
  UserShare,
  ShareTrade,
} = require('../database/models');

const sequelize = new Sequelize(config.development);

const deposit = async () => {};

const withdraw = async (newBalance, getUser, operation) => {
  const { wallets, id } = getUser;
  const { value } = wallets;

  try {
    const result = await sequelize.transaction(async (transaction) => {
      const newTransaction = await Transaction.create(
        {
          userId: id,
          walletId: wallets.id,
          destination: null,
          value: Number(operation.value).toFixed(2),
        },
        { transaction },
      );
      await Wallet.update(
        { value: Number(newBalance).toFixed(2) },
        { where: { value }, transaction },
      );
      return newTransaction;
    });
    return result;
  } catch (err) {
    throw new Error('Falha na gravação de dados');
  }
};

const transfer = async (
  newBalance,
  getUser,
  operation,
  newBalanceDestination,
) => {
  const { wallets, id } = getUser;
  const { value } = wallets;

  try {
    const result = await sequelize.transaction(async (transaction) => {
      const newTransaction = await Transaction.create(
        {
          userId: id,
          walletId: wallets.id,
          destination: operation.destination,
          value: operation.value.toFixed(2),
        },
        { transaction },
      );
      await Wallet.update(
        { value: Number(newBalance).toFixed(2) },
        { where: { value, userId: id }, transaction },
      );
      await Wallet.update(
        { value: Number(newBalanceDestination).toFixed(2) },
        { where: { id: operation.destination }, transaction },
      );
      return newTransaction;
    });
    return result;
  } catch (err) {
    throw new Error('Falha na gravação de dados');
  }
};

const buy = async (operation, valorAtivo, newBalance, id) => {
  const { walletId, codAtivo, qtdeAtivo } = operation;

  try {
    const result = await sequelize.transaction(async (transaction) => {
      const newShareTransaction = await ShareTrade.create(
        {
          walletId,
          shareName: codAtivo,
          buyedBy: Number(valorAtivo).toFixed(2),
          selledBy: null,
          amount: qtdeAtivo,
          totalValue: (Number(valorAtivo) * Number(qtdeAtivo)).toFixed(2),
        },
        { transaction },
      );
      await Wallet.update(
        { value: Number(newBalance).toFixed(2) },
        { where: { id: walletId }, transaction },
      );
      const checkShares = await UserShare.findOne({
        where: { shareName: codAtivo },
      });
      if (checkShares) {
        await UserShare.update(
          {
            amount: Number(checkShares.amount) + Number(qtdeAtivo),
            buyedBy: Number(valorAtivo).toFixed(2),
            totalValue: (
              (Number(checkShares.amount) + Number(qtdeAtivo)) *
              Number(valorAtivo)
            ).toFixed(2),
          },
          { where: { walletId }, transaction },
        );
      } else {
        await UserShare.create(
          {
            userId: id,
            walletId,
            shareName: codAtivo,
            amount: qtdeAtivo,
            buyedBy: Number(valorAtivo).toFixed(2),
            totalValue: (Number(valorAtivo) * Number(qtdeAtivo)).toFixed(2),
          },
          { transaction },
        );
      }
      return newShareTransaction;
    });
    return result;
  } catch (err) {
    throw new Error(err.message);
  }
};

const sell = async (operation, valorAtivo, newBalance, id, buyedBy) => {
  const { walletId, codAtivo, qtdeAtivo } = operation;

  try {
    const result = await sequelize.transaction(async (transaction) => {
      const newShareTransaction = await ShareTrade.create(
        {
          walletId,
          shareName: codAtivo,
          buyedBy,
          selledBy: Number(valorAtivo).toFixed(2),
          amount: qtdeAtivo,
          totalValue: (Number(valorAtivo) * Number(qtdeAtivo)).toFixed(2),
        },
        { transaction },
      );
      await Wallet.update(
        { value: Number(newBalance).toFixed(2) },
        { where: { id: walletId }, transaction },
      );
      const checkShares = await UserShare.findOne({
        where: { shareName: codAtivo },
      });
      await UserShare.update(
        {
          amount: Number(checkShares.amount) - Number(qtdeAtivo),
          buyedBy,
          totalValue: (
            (Number(checkShares.amount) - Number(qtdeAtivo)) *
            Number(valorAtivo)
          ).toFixed(2),
        },
        { where: { walletId }, transaction },
      );
      return newShareTransaction;
    });
    return result;
  } catch (err) {
    throw new Error(err.message);
  }
};

const singUp = async (user, hashPass) => {
  try {
    const result = sequelize.transaction(async (transaction) => {
      const { id } = await UserShare.create({
        name: user.name,
        lastname: user.email,
        email: user.email,
        password: hashPass,
        image: user.image,
        isActive: user.isActive,
      }, {transaction});
      console.log(id)
      const {id: walletId} = await Wallet.create({
        userId: id,
        value: 0.00
      }, {transaction});
      await UserShare.create({
        userId: id,
        walletId,
        shareName: 'INIT',
        amount: 0,
        buyedBy: 0,
        totalValue: 0
      })
      return id
    });
    return result
  } catch (err) {
    throw new Error(err.message);
  }

}

module.exports = {
  deposit,
  withdraw,
  transfer,
  buy,
  sell,
  singUp,
};
