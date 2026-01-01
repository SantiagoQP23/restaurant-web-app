import { People } from '@mui/icons-material';
import {
  Card,
  CardHeader,
  Button,
  CardContent,
  Box,
  Typography
} from '@mui/material';
import { NavLink as RouterLink } from 'react-router-dom';
import { GroupBy, Period } from '../../../../Common/dto/period.model';
import { useQuery } from '@tanstack/react-query';
import {
  getForecastByDate,
  getRealFootfall
} from '../../../services/footfall.service';

export const FootfallSummary = () => {
  const period = Period.DAILY;

  const groupBy = GroupBy.DAY;

  const realFootfallQuery = useQuery({
    queryKey: ['realFootfall', period, groupBy],
    queryFn: () =>
      getRealFootfall({
        period,
        groupBy,
        startDate: new Date()
      })
  });

  const forecastFootfallQuery = useQuery({
    queryKey: ['forecastFootfall', period, groupBy],
    queryFn: () =>
      getForecastByDate({
        period,
        groupBy,
        startDate: new Date()
      })
  });

  return (
    <Card>
      <CardHeader
        title='Afluencia de clientes'
        action={
          <Button
            variant='outlined'
            component={RouterLink}
            to='/clients'
            size='small'
          >
            Ver todo
          </Button>
        }
      />

      <CardContent
        sx={{
          display: 'flex',
          gap: 1,
          alignItems: 'center'
        }}
      >
        <People />
        <Box display='flex' alignItems='flex-end'>
          <Typography variant='h3'>
            {!!realFootfallQuery.data?.footfall.length
              ? realFootfallQuery.data?.footfall[0].quantity
              : 0}
          </Typography>
          <Typography variant='h6'>
            /
            {!!forecastFootfallQuery.data?.footfall.length
              ? forecastFootfallQuery.data?.footfall[0].quantity
              : 0}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};
