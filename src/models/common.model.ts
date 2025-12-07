export enum TypeIdentification {
  CEDULA = 'CEDULA',
  RUC = 'RUC'
}

export interface Identification {
  id: string;
  type: TypeIdentification;
  num: string;
}

export interface CreateIdentification {
  type: TypeIdentification;
  num: string;
}

export interface IPerson {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  identification?: Identification;
  numPhone?: string;
}

export interface CreatePerson {
  firstName: string;
  lastName: string;
  email?: string;
  numPhone?: string;
  identification: CreateIdentification;
}
