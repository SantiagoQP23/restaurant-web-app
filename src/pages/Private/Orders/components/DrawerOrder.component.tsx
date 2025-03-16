import { Order, ITable, TypeOrder } from '../../../../models';

import NiceModal from '@ebay/nice-modal-react';

import {
  Box,
  Drawer,
  Stack,
  useTheme,
  Typography,
  IconButton,
  Button,
  Divider
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { selectOrders, selectTables, setActiveTable } from '../../../../redux';
import { CloseOutlined, Add, Circle } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useUpdateTable } from '../hooks/useUpdateTable';
import { useNewOrderStore } from '../store/newOrderStore';
import { Scrollbar } from '../../components';
import { OrderCard } from '../views';

interface Props {
  table: ITable;
}

export const DrawerOrder = NiceModal.create<Props>(({ table }) => {
  const modal = NiceModal.useModal();

  const dispatch = useDispatch();

  const { setTable, setOrderType } = useNewOrderStore();

  const { orders } = useSelector(selectOrders);

  const { updateTable } = useUpdateTable();

  const navigate = useNavigate();

  const ordersTable = orders.filter((order) => order.table?.id === table?.id);

  const closeDrawer = () => {
    modal.hide();
    dispatch(setActiveTable(null));
  };

  const handleAddOrder = () => {
    setTable(table!);

    setOrderType(TypeOrder.IN_PLACE);

    navigate('/orders/add/menu');

    closeDrawer();
  };

  const handleChangeStatusTable = (value: boolean) => {
    if (table) {
      updateTable({ tableId: table.id, isAvailable: value });
    }
  };

  const showEditOrderPage = (orderId: string) => {
    closeDrawer();
    navigate(`/orders/list/edit/${orderId}`);
  };

  return (
    <>
      <Drawer
        anchor='right'
        open={modal.visible}
        onClose={closeDrawer}
        PaperProps={{
          sx: {
            width: {
              xs: '100vw',
              sm: '80vw',
              md: 500
            },
            border: 'none',
            overflow: 'hidden'
          }
        }}
        sx={{
          zIndex: 1000
        }}
      >
        <Stack
          direction='row'
          justifyContent='space-between'
          alignItems='center'
          p={2}
        >
          <Box>
            <Typography variant='h4'>Mesa {table?.name}</Typography>
            <Box
              alignItems='center'
              display='flex'
              sx={{
                color: `${table?.isAvailable ? 'success' : 'error'}.main`
              }}
              gap={1}
            >
              <Circle fontSize='small' sx={{ fontSize: 10 }} />
              <Typography fontSize='0.8rem'>
                {table?.isAvailable ? 'Disponible' : 'Ocupada'}
              </Typography>
            </Box>
          </Box>
          <Stack direction='row' spacing={2} alignItems='center'>
            {ordersTable.length >= 1 && (
              <Button
                variant='contained'
                color='primary'
                startIcon={<Add />}
                onClick={handleAddOrder}
                size='small'
              >
                Añadir Pedido
              </Button>
            )}
            <IconButton onClick={closeDrawer} size='small'>
              <CloseOutlined fontSize='small' />
            </IconButton>
          </Stack>
        </Stack>

        <Divider />
        <Scrollbar height={'100%'}>
          {ordersTable.length >= 1 ? (
            <Stack spacing={2} direction='column' p={1}>
              {ordersTable.map((order: Order) => (
                <OrderCard order={order} key={order.id} onClick={closeDrawer} />
              ))}
            </Stack>
          ) : (
            <Stack direction='column' spacing={2} width='100%'>
              <Box>
                <Typography
                  variant='h6'
                  color='secondary'
                  textAlign='center'
                  my={5}
                >
                  Sin pedidos
                </Typography>

                <Stack alignItems='center' mt={2} spacing={5}>
                  {/* <Box>
                    <Switch
                      checked={table?.isAvailable}
                      onChange={(e, value) => handleChangeStatusTable(value)}
                      inputProps={{ "aria-label": "controlled" }}
                      color={activeTable?.isAvailable ? "success" : "error"}
                    />
                    <Label
                      color={activeTable?.isAvailable ? "success" : "error"}
                    >
                      <Circle
                        sx={{ fontSize: 10, mr: 1 }}
                        color={activeTable?.isAvailable ? "success" : "error"}
                      />

                      {activeTable?.isAvailable ? "Disponible" : "Ocupada"}
                    </Label>
                  </Box> */}
                  <Button
                    variant='contained'
                    color='primary'
                    startIcon={<Add />}
                    onClick={handleAddOrder}
                  >
                    Añadir pedido
                  </Button>
                </Stack>
              </Box>
            </Stack>
          )}
        </Scrollbar>
      </Drawer>
    </>
  );
});
