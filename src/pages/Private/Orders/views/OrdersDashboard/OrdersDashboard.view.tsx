import { useState } from 'react';
import {
  Tabs,
  Tab,
  Box,
  Button,
  Stack,
  Container,
  Grid,
  Card,
  CardHeader,
  CardContent,
  Typography,
  Tooltip
} from '@mui/material';
import { TitlePage } from '../../../components';
import { Tables } from './components/Tables.component';
import {
  Add,
  Assignment,
  LocalDining,
  PendingActions,
  SoupKitchen
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { OrderStatus, TypeOrder } from '../../../../../models';
import { useNewOrderStore } from '../../store/newOrderStore';
import { Users } from './components/Users.component';
import { Label } from '../../../../../components/ui';
import { TakeAwayOrders } from './components/TakeAwayOrders.component';
import { useSelector } from 'react-redux';
import { selectOrders } from '../../../../../redux';
import { LinearProgressWrapper } from '../../components';

enum DashboardViews {
  TABLES = 'TABLES',
  USERS = 'USERS',
  TAKE_AWAY = 'TAKE_AWAY'
}

export const OrdersDashboard = () => {
  const [view, setView] = useState(DashboardViews.TABLES);

  const { orders } = useSelector(selectOrders);

  const navigate = useNavigate();

  const { setOrderType } = useNewOrderStore((state) => state);

  const createOrderTakeAway = () => {
    setOrderType(TypeOrder.TAKE_AWAY);

    navigate('/orders/add/menu');
  };

  const totalOrders = orders.length;

  const paidOrders = orders.filter((order) => order.isPaid).length;

  const ordersTakeAway = orders.filter(
    (order) => order.type === TypeOrder.TAKE_AWAY && !order.isClosed
  ).length;

  const pendingOrders = orders.filter(
    (order) => order.status === OrderStatus.PENDING
  ).length;

  const inProgressOrders = orders.filter(
    (order) => order.status === OrderStatus.IN_PROGRESS
  ).length;

  const deliveredOrders = orders.filter(
    (order) => order.status === OrderStatus.DELIVERED
  ).length;

  return (
    <>
      <Container maxWidth='lg'>
        <TitlePage
          title='Pedidos'
          action={
            <Stack direction='row' spacing={1}>
              <Button
                variant='contained'
                startIcon={<Add />}
                onClick={createOrderTakeAway}
                size='small'
              >
                Crear pedido para llevar
              </Button>
            </Stack>
          }
        />

        <Grid container spacing={2} mb={2}>
          <Grid item xs={6} md={6} lg={3}>
            <Card>
              <CardHeader
                avatar={<Assignment color='primary' />}
                title='Total de pedidos'
              />
              <CardContent>
                <Typography variant='h1'>{orders.length}</Typography>
                <Tooltip title='Pedidos pagados'>
                  <LinearProgressWrapper
                    value={(paidOrders * 100) / totalOrders}
                    variant='determinate'
                    color='primary'
                  />
                </Tooltip>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6} md={6} lg={3}>
            <Card>
              <CardHeader
                avatar={<PendingActions color='warning' />}
                title='Pendientes'
              />
              <CardContent>
                <Typography variant='h1'>{pendingOrders}</Typography>
                <LinearProgressWrapper
                  value={(pendingOrders * 100) / totalOrders}
                  variant='determinate'
                  color='warning'
                />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6} md={6} lg={3}>
            <Card>
              <CardHeader
                avatar={<SoupKitchen color='info' />}
                title='En proceso'
              />
              <CardContent>
                <Typography variant='h1'>{inProgressOrders}</Typography>
                <LinearProgressWrapper
                  value={(inProgressOrders * 100) / totalOrders}
                  variant='determinate'
                  color='info'
                />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6} md={6} lg={3}>
            <Card>
              <CardHeader
                avatar={<LocalDining color='success' />}
                title='Entregados'
              />
              <CardContent>
                <Typography variant='h1'>{deliveredOrders}</Typography>
                <LinearProgressWrapper
                  value={(deliveredOrders * 100) / totalOrders}
                  variant='determinate'
                  color='success'
                />
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Tabs value={view} onChange={(e, value) => setView(value)}>
          <Tab value={DashboardViews.TABLES} label='Mesas' />
          {/* <Tab value={DashboardViews.USERS} label="Usuarios" icon={<Label sx={{ml: 1}} color="info">new</Label>} iconPosition="end" /> */}
          <Tab
            value={DashboardViews.TAKE_AWAY}
            label='Para llevar'
            icon={
              <Label sx={{ ml: 1 }} color='info'>
                {ordersTakeAway}
              </Label>
            }
            iconPosition='end'
          />
        </Tabs>

        <Box mt={2}>
          {view === DashboardViews.TABLES && <Tables />}
          {/* {view === DashboardViews.USERS && <Users />} */}
          {view === DashboardViews.TAKE_AWAY && <TakeAwayOrders />}
        </Box>
      </Container>
    </>
  );
};
