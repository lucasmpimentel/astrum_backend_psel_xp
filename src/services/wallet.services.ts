import CustomError from "../utils/CustomError";

const { Wallet } = require('../database/models');

const getBalance = async (clientId: number, user: string) => {
  const { id, name } = JSON.parse(user);
  if (id !== clientId) throw new CustomError(401, 'Não autorizado');

  const getWallet = await Wallet.findOne({ where: { userId: clientId } });
  const balance = {
    CodCliente: clientId,
    NomeCliente: name,
    Saldo: getWallet.value,
  }
  return balance;
}

export default {
  getBalance,
}