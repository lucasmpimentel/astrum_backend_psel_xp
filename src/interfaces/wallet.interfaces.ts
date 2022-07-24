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

export interface IDepositOrder {
  name: string;
  lastname: string;
  email: string;
  walletId: number;
  operation: string;
  value: number;
  newBalance: number;
}
