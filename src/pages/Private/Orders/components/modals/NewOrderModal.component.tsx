import {
  Dialog,
  Button,
  Typography,
  Stack,
  Chip,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
  SelectChangeEvent
} from '@mui/material';
import { Order, TypeOrder } from '../../../../../models/orders.model';
import { useSnackbar } from 'notistack';
import { useSelector } from 'react-redux';
import { selectTables } from '../../../../../redux';
import NiceModal, { muiDialogV5, useModal } from '@ebay/nice-modal-react';
import { useNewOrderStore } from '../../store/newOrderStore';
import { useNavigate } from 'react-router-dom';
import { PeopleCounter } from '../../views';
import { useEffect } from 'react';
import { ITable } from '@/models';

interface Props {
  defaultTable?: ITable;
}

export const NewOrderModal = NiceModal.create<Props>(({ defaultTable }) => {
  const modal = useModal();
  const { enqueueSnackbar } = useSnackbar();
  const { tables } = useSelector(selectTables);

  const { table, orderType, setOrderType, setTable } = useNewOrderStore(
    (state) => state
  );

  const navigate = useNavigate();

  const closeModal = () => {
    modal.hide();
  };

  const openNewOrder = () => {
    console.log({ orderType, table });
    if (orderType === TypeOrder.IN_PLACE && !table) {
      enqueueSnackbar('Por favor, seleccione una mesa', { variant: 'error' });
      return;
    }
    if (orderType === TypeOrder.TAKE_AWAY) {
      setTable(null);
    }
    closeModal();
    navigate('/orders/add');
  };

  const onSelectTableChange = (event: SelectChangeEvent) => {
    const tableId = event.target.value as string;
    const selectedTable = tables.find((t) => t.id === tableId) || null;

    setTable(selectedTable);
  };

  useEffect(() => {
    if (defaultTable) {
      setTable(defaultTable);
      setOrderType(TypeOrder.IN_PLACE);
    } else {
      setTable(null);
    }
  }, []);

  return (
    <Dialog {...muiDialogV5(modal)}>
      <Stack sx={{ px: { xs: 2, md: 4 }, py: 4 }} gap={3}>
        <Stack gap={1} alignItems='center'>
          <Typography variant='h4'>Nuevo pedido</Typography>
          <Typography variant='body1'>
            Ingresa los detalles del nuevo pedido
          </Typography>
        </Stack>

        <Stack spacing={2}>
          <Stack direction='row' spacing={1} justifyContent='center'>
            <Chip
              label='Para servir'
              onClick={() => setOrderType(TypeOrder.IN_PLACE)}
              variant={orderType === TypeOrder.IN_PLACE ? 'filled' : 'outlined'}
            />
            <Chip
              label='Para llevar'
              onClick={() => setOrderType(TypeOrder.TAKE_AWAY)}
              variant={
                orderType === TypeOrder.TAKE_AWAY ? 'filled' : 'outlined'
              }
            />
          </Stack>
          {orderType === TypeOrder.IN_PLACE && (
            <FormControl fullWidth>
              <InputLabel id='select-seccion'>Mesa</InputLabel>
              <Select
                labelId='select-seccion'
                label='Seccion'
                margin='dense'
                // disabled
                value={table?.id || ''}
                onChange={onSelectTableChange}
              >
                {tables.map((table) => (
                  <MenuItem key={table.id} value={table.id}>
                    Mesa {table.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
          <PeopleCounter />

          <Stack direction='row' justifyContent='center' gap={2}>
            <Button onClick={closeModal}>Cancelar</Button>
            <Button variant='contained' color='primary' onClick={openNewOrder}>
              Crear
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Dialog>
  );
});
