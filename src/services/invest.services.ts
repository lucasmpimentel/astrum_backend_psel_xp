import apiServices from './api.services';
import { IReqInvest } from '../interfaces/invests.interface';
import calculatorsUtils from '../utils/calculators.utils';
import CustomError from '../utils/CustomError';

const { Wallet, UserShare } = require('../database/models');
const sequelizeTransactions = require('../utils/sequelize.transactions');

const buy = async (operation: IReqInvest, user: string) => {
  try {
    // ---- Verifica se o usuário logado é o dono da carteira a ser operada -----
    const { id } = JSON.parse(user);
    const { walletId, codAtivo, qtdeAtivo } = operation;
    const wallet = await Wallet.findByPk(walletId);
    if (wallet.userId !== id) throw new CustomError(401, 'Não autorizado');
    // --------------------------------------------------------------------------

    const [getShare] = await apiServices.searchByName(codAtivo);
    if (!getShare || getShare.length === 0)
      throw new CustomError(404, 'Ativo não encontrado');

    // ---- Verifica se o ativo ainda está disponível pra compra ---------------
    const apiDate: string = String(getShare.dt_vnct_opc);
    const onDate: boolean = calculatorsUtils.calculateDate(apiDate);
    if (!onDate)
      throw new CustomError(
        401,
        'Não é possivel efetuar a compra de um ativo fechado',
      );

    // ---- Verifica se o ativo possui quantidade disponivel para compra -------
    const titulosDisp: number = Number(getShare.qt_tit_neg);
    const haveStock: boolean = Number(qtdeAtivo) < titulosDisp;
    if (!haveStock) throw new CustomError(401, 'Quantidade inválida de ativos');

    // ---- Verifica se o cliente possui saldo para operação ---------------------
    const valorAtivo = getShare.vl_fechamento;
    const clientBalance = wallet.value;
    const newBalance: number = calculatorsUtils.calculateBalance(
      qtdeAtivo,
      valorAtivo,
      clientBalance,
    );
    const haveBalance = newBalance > 0;
    if (!haveBalance) throw new CustomError(401, 'Saldo insuficiente');

    // ---- Chama operações de Banco de Dados -----------------------------------
    if (onDate && haveStock && haveBalance) {
      const result = await sequelizeTransactions.buy(
        operation,
        valorAtivo,
        newBalance,
        id,
      );
      return result;
    }
    throw new CustomError(500, 'Erro no servidor');
  } catch (err: any) {
    throw new CustomError(err.status, err.message);
  }
};

const sell = async (operation: IReqInvest, user: string) => {
  try {
    // ---- Verifica se o usuário logado é o dono da carteira a ser operada -----
    const { id } = JSON.parse(user);
    const { walletId, codAtivo, qtdeAtivo } = operation;
    const wallet = await Wallet.findByPk(walletId);
    if (wallet.userId !== id) throw new CustomError(401, 'Não autorizado');

    // ---- Verifica se o cliente possui o numero de ativos necessários ---------
    const getUserShare = await UserShare.findOne({
      where: { shareName: codAtivo },
    });
    const validAmount = getUserShare.amount >= qtdeAtivo;
    if (!validAmount)
      throw new CustomError(401, 'Quantidade inválida de ativos');
    //-----------------------------------------------------------------------------

    const [getShare] = await apiServices.searchByName(codAtivo);
    if (!getShare || getShare.length === 0)
      throw new CustomError(404, 'Ativo não encontrado');
    const valorAtivo = getShare.vl_fechamento;
    const newBalance = (Number(wallet.value) + Number(valorAtivo)).toFixed(2);

    // ---- Chama operações do Banco de Dados ----------------------------------
    if (validAmount) {
      const result = await sequelizeTransactions.sell(
        operation,
        valorAtivo,
        newBalance,
        id,
        getUserShare.buyedBy,
      );
      return result;
    }

    throw new CustomError(500, 'Erro no servidor');
  } catch (err: any) {
    throw new CustomError(err.status, err.message);
  }
};

export default {
  buy,
  sell,
};
