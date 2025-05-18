import { IRole } from '@/models';
import { useQuery } from '@tanstack/react-query';
import { getRoles } from '../services/roles.service';

export const useRoles = () => {
  const rolesQuery = useQuery<IRole[]>(['roles'], () => getRoles());

  return {
    rolesQuery
  };
};
