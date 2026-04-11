import { Done, DeleteOutline, MoreVert } from '@mui/icons-material';
import {
  Card,
  CardHeader,
  Typography,
  Stack,
  Box,
  Divider,
  IconButton,
  CardContent,
  Popover,
  MenuItem,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select
} from '@mui/material';
import { FC, useEffect, useMemo, useState } from 'react';
import {
  bindTrigger,
  usePopupState,
  bindPopover
} from 'material-ui-popup-state/hooks';
import NiceModal from '@ebay/nice-modal-react';
import { useSelector } from 'react-redux';
import { format } from 'date-fns';
import { Order, OrderStatus, TypeOrder } from '@/models';
import { selectTables } from '@/redux/slices/tables/tables.slice';
import { ModalCloseOrder } from './modals';
import { statusModalDeleteOrder } from '../services/orders.service';
import { LabelStatusOrder } from './LabelStatusOrder.component';
import { LabelStatusPaid } from './LabelStatusPaid.component';
import { formatMoney } from '../../Common/helpers/format-money.helper';
import { OrderDetailCard } from '../views/EditOrder/components/OrderDetailCard.component';
import { useUpdateOrder } from '../hooks';

interface Props {
  order: Order;
  onClick?: () => void;
}

export const EditOrderCard: FC<Props> = ({ order, onClick }) => {
  const popupState = usePopupState({
    variant: 'popover',
    popupId: 'popoverOrder1'
  });

  const { tables } = useSelector(selectTables);
  const { mutate: updateOrder } = useUpdateOrder();

  const [tableId, setTableId] = useState(order.table?.id || '');
  const [people, setPeople] = useState(order.people || 0);
  const [notes, setNotes] = useState(order.notes || '');
  const [deliveryTime, setDeliveryTime] = useState(
    format(new Date(order.deliveryTime), "yyyy-MM-dd'T'HH:mm")
  );

  useEffect(() => {
    setTableId(order.table?.id || '');
    setPeople(order.people || 0);
    setNotes(order.notes || '');
    setDeliveryTime(format(new Date(order.deliveryTime), "yyyy-MM-dd'T'HH:mm"));
  }, [order]);

  const handleClick = () => {
    onClick && onClick();
  };

  const paidBills = order.bills.filter((bill) => bill.isPaid).length;

  const isDeleteableOrder =
    order.status === OrderStatus.PENDING && paidBills === 0;

  const isCloseableOrder =
    order.status === OrderStatus.DELIVERED && order.isPaid && !order.isClosed;

  const showModalCloseOrder = () => {
    NiceModal.show(ModalCloseOrder, {
      order
    });
  };

  const handleClose = () => {
    popupState.close();
    handleClick();
    showModalCloseOrder();
  };

  const handleDelete = () => {
    popupState.close();
    handleClick();
    statusModalDeleteOrder.setSubject(true, order);
  };

  const canEdit = useMemo(
    () => !order.isClosed && order.status !== OrderStatus.CANCELLED,
    [order.isClosed, order.status]
  );

  const submitUpdate = (payload: {
    tableId?: string;
    people?: number;
    notes?: string;
    deliveryTime?: Date;
  }) => {
    if (!canEdit) return;

    updateOrder({
      id: order.id,
      ...payload
    });
  };

  const handleChangeTable = (value: string) => {
    setTableId(value);
    submitUpdate({ tableId: value || undefined });
  };

  const handlePeopleBlur = () => {
    if (people === order.people) return;
    submitUpdate({ people });
  };

  const handleNotesBlur = () => {
    if (notes === (order.notes || '')) return;
    submitUpdate({ notes });
  };

  const handleDeliveryBlur = () => {
    const next = new Date(deliveryTime);
    const current = new Date(order.deliveryTime);

    if (Number.isNaN(next.getTime())) return;
    if (next.getTime() === current.getTime()) return;

    submitUpdate({ deliveryTime: next });
  };

  return (
    <>
      <Card
        sx={{
          border: '1px solid #e0e0e0',
          boxShadow: 'none',
          my: 1
        }}
      >
        <CardHeader
          title={<Typography variant='h5'>{`Pedido #${order.num}`}</Typography>}
          subheader={format(new Date(order.createdAt), 'dd/MM/yyyy HH:mm')}
          action={
            <Stack direction='row' spacing={1} alignItems='center'>
              <LabelStatusOrder status={order.status} simple />
              <IconButton {...bindTrigger(popupState)}>
                <MoreVert />
              </IconButton>
            </Stack>
          }
        />

        <CardContent>
          <Stack spacing={2}>
            <Box display='flex' gap={1} alignItems='center'>
              <LabelStatusPaid isPaid={order.isPaid} />
              <Divider orientation='vertical' flexItem />
              <Typography align='right' variant='h6'>
                {formatMoney(order.total)}
              </Typography>
            </Box>

            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label='Tipo de pedido'
                  value={
                    order.type === TypeOrder.IN_PLACE
                      ? 'Para servir'
                      : 'Para llevar'
                  }
                  disabled
                />
              </Grid>

              {order.type === TypeOrder.IN_PLACE && (
                <Grid item xs={12}>
                  <FormControl fullWidth disabled={!canEdit}>
                    <InputLabel id='edit-order-card-table-id'>Mesa</InputLabel>
                    <Select
                      labelId='edit-order-card-table-id'
                      label='Mesa'
                      value={tableId}
                      onChange={(e) => handleChangeTable(e.target.value)}
                    >
                      <MenuItem value=''>Ninguna</MenuItem>
                      {tables.map((table) => (
                        <MenuItem key={table.id} value={table.id}>
                          Mesa {table.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              )}

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label='Hora de entrega'
                  type='datetime-local'
                  value={deliveryTime}
                  onChange={(e) => setDeliveryTime(e.target.value)}
                  onBlur={handleDeliveryBlur}
                  disabled={!canEdit}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label='Personas'
                  type='number'
                  value={people}
                  onChange={(e) => setPeople(Number(e.target.value))}
                  onBlur={handlePeopleBlur}
                  disabled={!canEdit}
                  inputProps={{ min: 0 }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  minRows={3}
                  label='Notas'
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  onBlur={handleNotesBlur}
                  disabled={!canEdit}
                />
              </Grid>
            </Grid>

            <Divider />

            <Stack spacing={1}>
              <Typography variant='subtitle1'>Productos</Typography>
              {order.details.map((detail) => (
                <OrderDetailCard key={detail.id} detail={detail} />
              ))}
            </Stack>
          </Stack>
        </CardContent>
      </Card>

      <Popover
        {...bindPopover(popupState)}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        slotProps={{
          paper: {
            sx: {
              width: 140,
              zIndex: 1000
            }
          }
        }}
      >
        <MenuItem onClick={handleClose} disabled={!isCloseableOrder}>
          <Done fontSize='small' sx={{ mr: 2 }} />
          Cerrar
        </MenuItem>
        <MenuItem
          onClick={handleDelete}
          disabled={!isDeleteableOrder}
          sx={{ color: 'error.main' }}
        >
          <DeleteOutline fontSize='small' sx={{ mr: 2 }} />
          Eliminar
        </MenuItem>
      </Popover>
    </>
  );
};
