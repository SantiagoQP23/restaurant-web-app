import { CreatePerson } from '../../../../models/common.model';

export interface CreateUser extends CreatePerson {
  username: string;
  role: { name: string };
}
