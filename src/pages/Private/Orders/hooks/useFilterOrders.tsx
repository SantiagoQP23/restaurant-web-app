import { usePagination } from '@mui/lab';
import { useDateFilter } from '../../../../hooks/useDateFilter';
import { Period } from '../../Common/dto/period.model';
import { usePaginationAsync } from '../../../../hooks/usePaginationAsync';
import { useState } from 'react';
import { IClient, ITable, IUser, OrderStatus } from '../../../../models';

export const useFilterOrders = () => {
  const dateFilter = useDateFilter(Period.CUSTOM);

  const pagination = usePaginationAsync();

  const [user, setUser] = useState<null | IUser>(null);

  const [table, setTable] = useState<null | ITable>(null);

  const [client, setClient] = useState<null | IClient>(null);

  const [status, setStatus] = useState<null | OrderStatus>(null);

  const [isPaid, setIsPaid] = useState<boolean | null>(null);

  const handleChangeUser = (user: IUser | null) => {
    setUser(user);
  };

  const handleChangeTable = (table: ITable | null) => {
    setTable(table);
  };

  const handleChangeClient = (client: IClient | null) => {
    setClient(client);
  };

  const handleChangeStatus = (status: OrderStatus | null) => {
    setStatus(status);
  };

  const handleChangeIsPaid = (isPaid: boolean | null) => {
    setIsPaid(isPaid);
  };

  return {
    user,
    table,
    client,
    status,
    isPaid,
    handleChangeUser,
    handleChangeTable,
    handleChangeClient,
    handleChangeStatus,
    handleChangeIsPaid,

    ...dateFilter,
    ...pagination
  };
};
