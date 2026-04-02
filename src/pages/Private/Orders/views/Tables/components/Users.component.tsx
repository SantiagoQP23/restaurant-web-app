import { Grid } from '@mui/material';

import { OrdersUser } from './OrdersUser.component';
import { useQuery } from '@tanstack/react-query';
import { useDateFilter } from '../../../../../../hooks/useDateFilter';
import {
  ResponseIncomesByUser,
  getIncomesByUser
} from '../../../../Reports/services/dashboard.service';
import { Period } from '../../../../Common/dto/period.model';

export const Users = () => {
  const { period, startDate, endDate } = useDateFilter(Period.MONTHLY);

  const { data } = useQuery<ResponseIncomesByUser[]>({
    queryKey: ['best-selling-products', { period, startDate, endDate }],
    queryFn: () => {
      return getIncomesByUser({
        period,
        startDate
      });
    }
  });

  return (
    <>
      <Grid container spacing={2}>
        {data?.map((user) => (
          <Grid item key={user.userId} xs={12} md={6} lg={4}>
            <OrdersUser user={user} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};
