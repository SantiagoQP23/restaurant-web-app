import { IPerson } from './common.model';

export interface IFormLogin {
  username: string;
  password: string;
}

export interface IRole {
  id: number;
  name: string;
  description: string;
}

export enum Roles {
  admin = 'Administrador',
  mesero = 'Mesero',
  despachador = 'Despachador'
}

export interface IUser {
  id: string;
  username: string;
  person: IPerson;
  online: boolean;
  role: IRole;
  isActive: boolean;
}
