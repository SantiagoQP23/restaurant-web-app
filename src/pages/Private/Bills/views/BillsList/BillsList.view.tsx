import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Container,
  Grid,
  LinearProgress,
  Stack,
  Typography
} from '@mui/material';
import { TitlePage } from '../../../components';
import { useBills } from '../../hooks/useBills';
import { BillCard } from './components/BillCard.component';
import { Assignment, Cached, Person } from '@mui/icons-material';
import { useBillsToPay } from '../../hooks/useBillsToPay';
import { formatMoney } from '../../../Common/helpers/format-money.helper';
import { LoadingButton } from '@mui/lab';

export const BillsList = () => {
  const { data: bills, isPending, refetch, isFetching } = useBills();

  const { usersWithOrders: users } = useBillsToPay(bills || []);

  if (isPending) return <p>Loading...</p>;

  return (
    <Container maxWidth='lg'>
      <TitlePage
        title='Cuentas'
        action={
          <LoadingButton
            size='small'
            variant='contained'
            startIcon={<Cached />}
            loading={isFetching}
            onClick={() => refetch()}
          >
            Actualizar
          </LoadingButton>
        }
      />

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Card>
            <CardHeader
              avatar={<Assignment color='primary' />}
              title='Cuentas por cobrar'
              titleTypographyProps={{ variant: 'h5' }}
            />
            <CardContent>
              <Typography variant='h1'>{bills?.length || 0}</Typography>
            </CardContent>
          </Card>
        </Grid>

        {users.length > 0 ? (
          users.map((user) => (
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Card>
                <CardHeader
                  avatar={<Person color='primary' />}
                  title={`${user.person.firstName} ${user.person.lastName}`}
                  titleTypographyProps={{ variant: 'h5' }}
                />
                <CardContent>
                  <Box key={user.id}>
                    <Box
                      display='flex'
                      justifyContent='space-between'
                      alignItems='center'
                      sx={{ mb: 1 }}
                    >
                      <Box>
                        <Typography fontSize='0.9rem'>
                          {formatMoney(user.totalInBills)}
                        </Typography>
                      </Box>
                      <Typography variant='h5'>
                        {formatMoney(user.totalToPay)}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Box sx={{ width: '100%', mr: 1 }}>
                        <LinearProgress
                          variant='determinate'
                          value={(user.totalInBills * 100) / user.totalToPay}
                        />
                      </Box>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography variant='h1'>No hay pedidos</Typography>
        )}
      </Grid>

      <Grid container spacing={2} mt={1}>
        {bills?.map((bill) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={bill.id}>
            <BillCard bill={bill} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};
