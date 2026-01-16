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
  Tooltip,
  Chip
} from '@mui/material';
import { TitlePage } from '../../../components';
import { Tables } from './components/Tables.component';
import { Add } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { OrderStatus, TypeOrder } from '../../../../../models';
import { useNewOrderStore } from '../../store/newOrderStore';
import { Label } from '../../../../../components/ui';
import { TakeAwayOrders } from './components/TakeAwayOrders.component';
import { useSelector } from 'react-redux';
import { selectOrders } from '../../../../../redux';
import NiceModal from '@ebay/nice-modal-react';
import { NewOrderModal } from '../../components/modals/NewOrderModal.component';
import { OrderList } from './components/OrderList.component';
import { fontWeight } from '@mui/system';

enum DashboardViews {
  ALL = 'ALL',
  TABLES = 'TABLES',
  USERS = 'USERS',
  TAKE_AWAY = 'TAKE_AWAY'
}

interface HeaderBoxProps {
  title: string;
  count: number | string;
}

const HeaderBox = ({ title, count }: HeaderBoxProps) => {
  return (
    <Box
      sx={{
        p: 2,
        border: 1,
        borderColor: 'divider',
        borderRadius: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: 1
      }}
    >
      <Typography variant='body2' sx={{ fontWeight: 'semibold' }}>
        {title}
      </Typography>
      <Typography variant='h4' sx={{ fontWeight: 'normal' }}>
        {count}
      </Typography>
      {/* <Chip label={count} size='small' /> */}
    </Box>
  );
};

export const OrdersDashboard = () => {
  const [view, setView] = useState(DashboardViews.ALL);

  const { orders } = useSelector(selectOrders);

  const navigate = useNavigate();

  const { setOrderType } = useNewOrderStore((state) => state);

  const openNewOrderModal = () => {
    NiceModal.show(NewOrderModal);
    // setOrderType(TypeOrder.TAKE_AWAY);
    //
    // navigate('/orders/add');
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
                onClick={openNewOrderModal}
                size='small'
              >
                Crear Pedido
              </Button>
            </Stack>
          }
        />

        <Grid container spacing={2} mb={2}>
          <Grid item xs={12} sm={6} md={3} lg={3}>
            <HeaderBox title='Total de pedidos' count={totalOrders} />
          </Grid>
          <Grid item xs={12} sm={6} md={3} lg={3}>
            <HeaderBox title='Pedidos pagados' count={paidOrders} />
          </Grid>
          <Grid item xs={12} sm={6} md={3} lg={3}>
            <HeaderBox title='Pendientes' count={pendingOrders} />
          </Grid>
          <Grid item xs={12} sm={6} md={3} lg={3}>
            <HeaderBox title='En proceso' count={inProgressOrders} />
          </Grid>
        </Grid>

        {/* <Grid container spacing={2} mb={2}> */}
        {/*   <Grid item xs={6} md={6} lg={3}> */}
        {/*     <Card> */}
        {/*       <CardHeader */}
        {/*         avatar={<Assignment color='primary' />} */}
        {/*         title='Total de pedidos' */}
        {/*       /> */}
        {/*       <CardContent> */}
        {/*         <Typography variant='h1'>{orders.length}</Typography> */}
        {/*         <Tooltip title='Pedidos pagados'> */}
        {/*           <LinearProgressWrapper */}
        {/*             value={(paidOrders * 100) / totalOrders} */}
        {/*             variant='determinate' */}
        {/*             color='primary' */}
        {/*           /> */}
        {/*         </Tooltip> */}
        {/*       </CardContent> */}
        {/*     </Card> */}
        {/*   </Grid> */}
        {/*   <Grid item xs={6} md={6} lg={3}> */}
        {/*     <Card> */}
        {/*       <CardHeader */}
        {/*         avatar={<PendingActions color='warning' />} */}
        {/*         title='Pendientes' */}
        {/*       /> */}
        {/*       <CardContent> */}
        {/*         <Typography variant='h1'>{pendingOrders}</Typography> */}
        {/*         <LinearProgressWrapper */}
        {/*           value={(pendingOrders * 100) / totalOrders} */}
        {/*           variant='determinate' */}
        {/*           color='warning' */}
        {/*         /> */}
        {/*       </CardContent> */}
        {/*     </Card> */}
        {/*   </Grid> */}
        {/*   <Grid item xs={6} md={6} lg={3}> */}
        {/*     <Card> */}
        {/*       <CardHeader */}
        {/*         avatar={<SoupKitchen color='info' />} */}
        {/*         title='En proceso' */}
        {/*       /> */}
        {/*       <CardContent> */}
        {/*         <Typography variant='h1'>{inProgressOrders}</Typography> */}
        {/*         <LinearProgressWrapper */}
        {/*           value={(inProgressOrders * 100) / totalOrders} */}
        {/*           variant='determinate' */}
        {/*           color='info' */}
        {/*         /> */}
        {/*       </CardContent> */}
        {/*     </Card> */}
        {/*   </Grid> */}
        {/*   <Grid item xs={6} md={6} lg={3}> */}
        {/*     <Card> */}
        {/*       <CardHeader */}
        {/*         avatar={<LocalDining color='success' />} */}
        {/*         title='Entregados' */}
        {/*       /> */}
        {/*       <CardContent> */}
        {/*         <Typography variant='h1'>{deliveredOrders}</Typography> */}
        {/*         <LinearProgressWrapper */}
        {/*           value={(deliveredOrders * 100) / totalOrders} */}
        {/*           variant='determinate' */}
        {/*           color='success' */}
        {/*         /> */}
        {/*       </CardContent> */}
        {/*     </Card> */}
        {/*   </Grid> */}
        {/* </Grid> */}

        <Tabs value={view} onChange={(e, value) => setView(value)}>
          <Tab value={DashboardViews.ALL} label='Todos' />
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
          {view === DashboardViews.ALL && <OrderList />}
          {view === DashboardViews.TABLES && <Tables />}
          {/* {view === DashboardViews.USERS && <Users />} */}
          {view === DashboardViews.TAKE_AWAY && <TakeAwayOrders />}
        </Box>
      </Container>
    </>
  );
};
