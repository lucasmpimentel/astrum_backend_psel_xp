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
    NomeAtivo: share.shareName,
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
  const {
    id: id_acao,
    dt_pregao,
    cd_acao,
    nm_empresa_rdz,
    moeda_ref,
    vl_abertura,
    vl_maximo,
    vl_minimo,
    vl_medio,
    vl_fechamento,
    qt_tit_neg,
    cd_acao_rdz,
    dt_vnct_opc,
  } = getShare;
  const result = {
    IdAtivo: id_acao,
    CodAtivo: cd_acao_rdz,
    CodAcao: cd_acao,
    Empresa: nm_empresa_rdz,
    MoedaRef: moeda_ref,
    QtdeAtivo: qt_tit_neg,
    ValorAbertura: vl_abertura,
    ValorMax: vl_maximo,
    ValorMed: vl_medio,
    ValorMin: vl_minimo,
    ValorFechamento: vl_fechamento,
    DataPregao: dt_pregao,
    DataVencOpc: dt_vnct_opc,
  };
  return result
};

export default {
  getClientShares,
  getSharesById,
};
