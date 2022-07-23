import { IShareUnit } from '../interfaces/shares.interfaces';
import CustomError from '../utils/CustomError';

const { UserShare } = require('../database/models');

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

export default {
  getClientShares,
};
