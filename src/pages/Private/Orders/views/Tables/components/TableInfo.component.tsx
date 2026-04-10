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
import { CloseOutlined, Add, Circle } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { ITable, Order, TypeOrder } from '@/models';
import { selectOrders, setActiveTable } from '@/redux';
import { useNewOrderStore } from '../../../store/newOrderStore';
import { useUpdateTable } from '../../../hooks';
import { OrderCard } from './OrderCard.component';
import { Scrollbar } from '@/pages/Private/components';

interface Props {
  table: ITable;
}

export const TableInfo = ({ table }: Props) => {
  const dispatch = useDispatch();

  const { setTable, setOrderType } = useNewOrderStore();

  const { orders } = useSelector(selectOrders);

  const { updateTable } = useUpdateTable();

  const navigate = useNavigate();

  const ordersTable = orders.filter((order) => order.table?.id === table?.id);

  const closeDrawer = () => {
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
      <Box
        border={1}
        borderColor='divider'
        p={2}
        borderRadius={1}
        my={1}
        display='flex'
        flexDirection='column'
        gap={2}
        height='100%'
      >
        <Stack
          direction='row'
          justifyContent='space-between'
          alignItems='center'
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
          </Stack>
        </Stack>

        <Scrollbar height={'100%'}>
          {ordersTable.length >= 1 ? (
            <Stack spacing={2} direction='column'>
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
      </Box>
    </>
  );
};
