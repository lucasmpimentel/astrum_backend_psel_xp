export interface ILoginEntry {
  email: string;
  password: string;
}

export interface IUserDB {
  id: number;
  name: string;
  lastname: string;
  email: string;
  password: string;
  image?: string;
  isActive: boolean;
}