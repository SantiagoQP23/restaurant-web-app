import { useState } from 'react';

import { format } from 'date-fns';

import { useSelector, useDispatch } from 'react-redux';

import {
  Button,
  useTheme,
  MenuItem,
  Box,
  Container,
  TableContainer,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  Table,
  Popover,
  Card,
  Typography,
  LinearProgress
} from '@mui/material';

// Componentes

import { resetActiveOrder, selectOrders } from '../../../../../redux';
import { useNavigate } from 'react-router-dom';
import { DeleteOutlined, EditOutlined } from '@mui/icons-material';

import AddIcon from '@mui/icons-material/Add';
import { statusModalDeleteOrder } from '../../services/orders.service';
import { TitlePage } from '../../../components/TitlePage.component';
import { OrderListToolbar } from './components/OrderListToolbar.component';
import { Checkbox } from '@mui/material/';
import { TablePagination, IconButton } from '@mui/material';
import { TabsOrderStatus } from './components/TabsOrderStatus.component';
import { LabelStatusOrder } from '../../components/LabelStatusOrder.component';
import { useOrders } from '../../hooks';

export const ListOrders = () => {
  const { orders, activeOrder } = useSelector(selectOrders);

  const [open, setOpen] = useState(null);

  const [statusOrderFilter] = useState<string>('all');

  const {
    page,
    handleChangePage,
    handleChangeRowsPerPage,
    rowsPerPage,
    ordersQuery,
    startDate,
    handleChangeStartDate,
    handleChangeUser,
    status,
    handleChangeStatus,
    user,
    isPaid,
    handleChangeIsPaid,
    endDate,
    handleChangeEndDate
  } = useOrders();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const theme = useTheme();

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const addOrder = () => {
    dispatch(resetActiveOrder());
    navigate('/orders');
  };

  return (
    <>
      <Container maxWidth='xl'>
        <TitlePage
          title='Pedidos'
          action={
            <Button
              startIcon={<AddIcon />}
              variant='contained'
              color='primary'
              onClick={() => addOrder()}
            >
              Añadir Pedido
            </Button>
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
              changeStatus={handleChangeStatus}
              statusOrderFilter={status}
              orders={orders}
              isPaid={isPaid}
              changeIsPaid={handleChangeIsPaid}
            />
          </Box>

          <OrderListToolbar
            statusOrderFilter={statusOrderFilter}
            startDate={startDate}
            handleChangeStartDate={handleChangeStartDate}
            endDate={endDate}
            handleChangeEndDate={handleChangeEndDate}
            handleChangeUser={handleChangeUser}
            user={user}
          />

          <Typography>
            {ordersQuery.isFetching && <LinearProgress />}
          </Typography>

          <TableContainer>
            <Table
            // size='small'
            >
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Checkbox />
                  </TableCell>
                  <TableCell>Mesa</TableCell>
                  <TableCell>Mesero</TableCell>
                  <TableCell>Cliente</TableCell>
                  <TableCell>Hora</TableCell>
                  <TableCell>Estado</TableCell>
                  <TableCell>Total</TableCell>
                  <TableCell align='center'>Acciones</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {ordersQuery.data?.count === 0 && (
                  <TableRow>
                    <TableCell colSpan={8}>
                      <Typography my={5} textAlign='center'>
                        No hay pedidos
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}

                {ordersQuery.data?.orders.map((order) => (
                  <TableRow
                    hover
                    key={order.id}
                    sx={{
                      cursor: 'pointer',
                      whiteSpace: 'nowrap',
                      '&:hover': {
                        backgroundColor: theme.colors.alpha.black[5]
                      }
                    }}
                    // onClick={() => navigate(`orders/${order.id}`)}
                  >
                    <TableCell>
                      <Checkbox />
                    </TableCell>
                    <TableCell>Mesa {order.table?.name}</TableCell>
                    <TableCell>
                      {order.user.person.firstName} {order.user.person.lastName}
                    </TableCell>
                    <TableCell>{order.notes}</TableCell>

                    <TableCell>
                      {format(new Date(order.createdAt), 'dd/MM/yyyy HH:mm')}
                    </TableCell>
                    <TableCell>
                      <LabelStatusOrder status={order.status} />
                    </TableCell>
                    <TableCell>$ {order.total}</TableCell>
                    <TableCell align='center'>
                      {/* <IconButton onClick={(e) => handleOpenMenu(e, order)}>
                            <MoreVert />
                          </IconButton> */}
                      <IconButton
                        onClick={() => navigate(`edit/${order.id}`)}
                        color='primary'
                      >
                        <EditOutlined />
                      </IconButton>

                      <IconButton
                        color='error'
                        onClick={() => {
                          statusModalDeleteOrder.setSubject(true, order);
                        }}
                        disabled={
                          !!order.details?.find(
                            (detail) => detail.qtyDelivered > 0
                          )
                        }
                      >
                        <DeleteOutlined />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component='div'
            count={ordersQuery.data?.count || 0}
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
              borderRadius: 0.75
            }
          }
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
  );
};
