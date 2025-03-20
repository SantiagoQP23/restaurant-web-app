import { CreatePerson, Identification } from './common.model';

export interface IPerson {
  id: string;
  firstName: string;
  lastName: string;
  email?: string;
  identification?: Identification;
  numPhone?: string;
}

export interface IClient {
  id: string;
  person: IPerson;
  address: string;
  isActive: boolean;
}

export interface ICreateClient extends CreatePerson {
  address?: string;
}
