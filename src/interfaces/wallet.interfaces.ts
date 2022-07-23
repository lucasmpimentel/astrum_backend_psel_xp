export interface IWallet {
  id: number;
  value: number;
  userId: number;
}

export interface ITransfer {
  userId: number;
  walletId: number;
  password: string;
  destination: number;
  value: number;
  op: string;
}
