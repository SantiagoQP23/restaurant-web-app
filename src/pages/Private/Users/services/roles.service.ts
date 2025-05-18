import { restauranteApi } from '@/api';
import { IRole } from '@/models';

export const getRoles = async (): Promise<IRole[]> => {
  const resp = await restauranteApi.get<IRole[]>(`roles`);

  return resp.data;
};
