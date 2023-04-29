import { useState, ChangeEvent } from 'react';

import { format } from 'date-fns';

import { useSelector, useDispatch } from 'react-redux';

import {
  Button, useTheme,
  MenuItem, Box, Container, TableContainer, TableBody,
  TableHead, TableRow, TableCell, Table, Popover,
  Card
} from '@mui/material';


// Componentes

import { loadOrders, resetActiveOrder, selectAuth, selectOrders, setActiveOrder, setLastUpdatedOrders } from '../../../../../redux';

import { IOrder, OrderStatus } from '../../../../../models';
import { useNavigate } from 'react-router-dom';
import { DeleteOutlined, EditOutlined } from '@mui/icons-material';


import AddIcon from '@mui/icons-material/Add';
import { useFetchAndLoad } from '../../../../../hooks';
import { getOrdersToday } from '../../services/orders.service';
import Scrollbars from 'react-custom-scrollbars-2';
import { TitlePage } from '../../../components/TitlePage.component';
import { OrderListToolbar } from './components/OrderListToolbar.component';
import { Checkbox } from '@mui/material/';
import { TablePagination, IconButton } from '@mui/material';
import { TabsOrderStatus } from './components/TabsOrderStatus.component';
import { LabelStatusOrder } from './components/LabelStatusOrder.component';


// function applySortFilter(array: IOrder[], comparator, query) {
//   const stabilizedThis = array.map((el, index) => [el, index]);
//   stabilizedThis.sort((a, b) => {
//     const order = comparator(a[0], b[0]);
//     if (order !== 0) return order;
//     return a[1] - b[1];
//   });
//   if (query) {
//     return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
//   }
//   return stabilizedThis.map((el) => el[0]);
// }

const filterOrders = (orders: IOrder[], waiter: string, status: string): IOrder[] => {

  let ordersF: IOrder[] = orders;


  if (waiter !== 'all') {
    ordersF = orders.filter(order => order.user.id === waiter)
  }


  if (status !== 'all') {

    if (status === 'unpaid') {
      ordersF = ordersF.filter(order => order.status === OrderStatus.DELIVERED && !order.isPaid)
    } else {
      const orderStatus = status as OrderStatus;
      ordersF = ordersF.filter(order => order.status === orderStatus)
    }


  }

  return ordersF;



}



export const ListOrders = () => {
  // const [view, setView] = useState('list');

  const { user } = useSelector(selectAuth);
  const { orders, activeOrder } = useSelector(selectOrders);

  const [open, setOpen] = useState(null);

  const [page, setPage] = useState(0);

  const [statusOrderFilter, setStatusOrderFilter] = useState<string>('all');

  const [selected, setSelected] = useState<string[]>([]);

  const [filterWaiter, setFilterWaiter] = useState(user?.id || 'all');


  const [rowsPerPage, setRowsPerPage] = useState(10);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const theme = useTheme();

  const { callEndpoint, loading } = useFetchAndLoad();


  const handleOpenMenu = (event: any, order: IOrder) => {
    dispatch(setActiveOrder(order))
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const addOrder = () => {
    dispatch(resetActiveOrder());
    navigate('add');
  }

  const handleChangePage = (event: any, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const changeWaiter = (waiter: string) => {
    setPage(0);
    setFilterWaiter(waiter);
  }

  const changeStatus = (event: React.SyntheticEvent, newValue: string) => {
    setPage(0);
    setStatusOrderFilter(newValue);
  }

  const refreshOrders = () => {

    callEndpoint(getOrdersToday())
      .then((resp) => {

        const { data } = resp;

        dispatch(loadOrders(data));

        dispatch(setLastUpdatedOrders(new Date().toISOString()));
      })
  }

  const filteredOrders = filterOrders(orders, filterWaiter, statusOrderFilter);

  return (

    <>

      <Container maxWidth='xl'>
        <TitlePage title='Pedidos'
          action={
            <Button
              startIcon={<AddIcon />}
              variant="contained"
              color="primary"
              onClick={() => addOrder()}
            >Añadir Pedido</Button>

          }
        />

        <Card>
          <Box
            sx={{
              overflowX: 'auto',

              py: 1
            }}
          >
            <TabsOrderStatus
              changeStatus={changeStatus}
              statusOrderFilter={statusOrderFilter}
              orders={orders}

            />
          </Box>

          <OrderListToolbar
            changeWaiter={changeWaiter}
            filterWaiter={filterWaiter}
            statusOrderFilter={statusOrderFilter}
          />

          <Scrollbars
            style={{ width: '100%', height: 'calc(100vh - 300px)' }}
            autoHide
            renderThumbHorizontal={() => {
              return (
                <Box
                  sx={{
                    width: 5,
                    background: `${theme.colors.alpha.black[10]}`,
                    borderRadius: `${theme.general.borderRadiusLg}`,
                    transition: `${theme.transitions.create(['background'])}`,

                    '&:hover': {
                      background: `${theme.colors.alpha.black[30]}`
                    }
                  }}
                />
              );
            }}


          >

            <TableContainer sx={{ minWidth: 800 }}>

              <Table>

                <TableHead
                >


                  <TableRow>
                    <TableCell>
                      <Checkbox />
                    </TableCell>
                    <TableCell>
                      Mesero
                    </TableCell>
                    <TableCell>
                      Cliente
                    </TableCell>
                    <TableCell>
                      Hora
                    </TableCell>
                    <TableCell>
                      Estado
                    </TableCell>
                    <TableCell>
                      Cantidad
                    </TableCell>
                    <TableCell>
                      Acciones
                    </TableCell>

                  </TableRow>

                </TableHead>

                <TableBody>

                  {
                    filteredOrders.map((order) => (
                      <TableRow
                        hover
                        key={order.id}
                        sx={{
                          cursor: 'pointer',
                          '&:hover': {
                            backgroundColor: theme.colors.alpha.black[5]

                          }
                        }}
                      // onClick={() => navigate(`orders/${order.id}`)}
                      >
                        <TableCell>
                          <Checkbox />
                        </TableCell>
                        <TableCell>
                          {order.user.person.firstName} {order.user.person.lastName}
                        </TableCell>
                        <TableCell>
                          {order.client?.person.firstName} {order.client?.person.lastName}
                        </TableCell>
                        <TableCell>
                          {format(new Date(order.createdAt), 'dd/MM/yyyy HH:mm')}
                        </TableCell>
                        <TableCell>
                          <LabelStatusOrder status={
                            order.status === OrderStatus.DELIVERED && !order.isPaid
                              ? "unpaid"
                              : order.status

                          } />
                        </TableCell>
                        <TableCell>
                          {order.total}
                        </TableCell>
                        <TableCell align='center'>
                          {/* <IconButton onClick={(e) => handleOpenMenu(e, order)}>
                            <MoreVert />
                          </IconButton> */}
                          <IconButton onClick={() => navigate(`edit/${order.id}`)}>
                            <EditOutlined />
                          </IconButton>
                        </TableCell>

                      </TableRow>
                    ))


                  }

                </TableBody>

              </Table>

            </TableContainer>

          </Scrollbars>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredOrders.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />



        </Card>


      </Container>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 1,
            width: 140,
            '& .MuiMenuItem-root': {
              px: 1,
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <MenuItem
          onClick={() => {
            navigate(`edit/${activeOrder?.id}`);
            handleCloseMenu();
          }}
        >
          <EditOutlined />
          Editar
        </MenuItem>

        <MenuItem sx={{ color: 'error.main' }}>
          <DeleteOutlined />
          Eliminar
        </MenuItem>
      </Popover>






    </>
  )

}
