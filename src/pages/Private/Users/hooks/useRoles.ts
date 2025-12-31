import { IRole } from '@/models';
import { useQuery } from '@tanstack/react-query';
import { getRoles } from '../services/roles.service';
import { queryKeys } from '@/api/query-keys';

/**
 * Hook to fetch all user roles
 * @version 2.0 - Migrated to React Query v5
 */
export const useRoles = () => {
  const rolesQuery = useQuery<IRole[]>({
    queryKey: queryKeys.roles.all,
    queryFn: () => getRoles()
  });

  return {
    rolesQuery
  };
};
