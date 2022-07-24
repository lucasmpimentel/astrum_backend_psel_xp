import { IShareUnit } from '../interfaces/shares.interfaces';
import CustomError from '../utils/CustomError';
import axios from 'axios';

const { UserShare } = require('../database/models');

const baseUrl = 'https://api-cotacao-b3.labdo.it';

const instance = axios.create({
  baseURL: baseUrl,
  timeout: 20000,
});

const getClientShares = async (clientId: number, user: string) => {
  const client = JSON.parse(user);
  if (client.id !== clientId) throw new CustomError(401, 'Não permitido');

  const getShares = await UserShare.findAll({ where: { userId: clientId } });
  const sharesResult = getShares.map((share: IShareUnit) => ({
    CodCliente: share.userId,
    CodAtivo: share.id,
    CodAcao: share.shareName,
    QtdeAtivo: share.amount,
    ValorCompra: Number(share.buyedBy).toFixed(2),
    ValorEmAtivo: (Number(share.buyedBy) * Number(share.amount)).toFixed(2),
  }));

  return sharesResult;
};

const getSharesById = async (id: number) => {
  const getShare = await instance
    .get(`api/cotacao/${id}`)
    .then((res) => res.data)
    .catch((err) => err.message);
  const result = {
    CodAtivo: getShare.id,
    NomeAtivo: getShare.cd_acao_rdz,
    CodAcao: getShare.cd_acao,
    Empresa: getShare.nm_empresa_rdz,
    MoedaRef: getShare.moeda_ref,
    QtdeAtivo: getShare.qt_tit_neg,
    ValorAbertura: getShare.vl_abertura,
    ValorMax: getShare.vl_maximo,
    ValorMed: getShare.vl_medio,
    ValorMin: getShare.vl_minimo,
    ValorFechamento: getShare.vl_fechamento,
    DataPregao: getShare.dt_pregao,
    DataVencOpc: getShare.dt_vnct_opc,
  };
  return result;
};

export default {
  getClientShares,
  getSharesById,
};
