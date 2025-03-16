import { Close, Save } from '@mui/icons-material';
import { FC, useEffect, useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  TextField,
  Typography,
  InputBase,
  Box
} from '@mui/material';
import { Order, TypeOrder } from '../../../../../../models';
import { OrderTable } from './OrderTable.component';
import { OrderTypeSelector } from './OrderTypeSelector.component';
import { MobileDateTimePicker } from '@mui/x-date-pickers';
import { useUpdateOrder } from '../../../hooks';
import { UpdateOrderDto } from '../../../dto';

import { LoadingButton, Pagination } from '@mui/lab';
import { useModal } from '../../../../../../hooks';

interface Props {
  open: boolean;
  closeModal: () => void;
  order: Order;
}

/**
 * Modal to edit an order
 * @author Steven Rosales
 * @version 1.0 17/03/2025 Adds type order
 */
export const ModalEditOrder: FC<Props> = ({ open, closeModal, order }) => {
  const [type, setType] = useState<TypeOrder>(order.type);

  const [tableId, setTableId] = useState<string>(
    order.table ? order.table.id : ''
  );

  const [people, setPeople] = useState<number>(order.people || 0);

  const [notes, setNotes] = useState<string>(order.notes || '');

  const { isOpen, handleOpen } = useModal();

  const [deliveryTime, setDeliveryTime] = useState<Date | null>(
    order.deliveryTime || null
  );

  const { mutate: updateOrder, isLoading, isOnline } = useUpdateOrder();

  const handleChangeDeliveryTime = (date: Date | null) => {
    setDeliveryTime(date);
  };

  const handleChangeNotes = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNotes(e.target.value);
  };

  const handleChangePeople = (value: number) => {
    setPeople(value);
  };

  const handleChangeTable = (tableId: string) => {
    setTableId(tableId);
  };

  const handleChangeType = (type: TypeOrder) => {
    setType(type);
  };

  useEffect(() => {
    setType(order.type);
    setTableId(order.table ? order.table.id : '');
    setPeople(order.people || 0);
    setNotes(order.notes || '');
    setDeliveryTime(order.deliveryTime || null);
  }, [order]);

  const submitUpdateOrder = () => {
    const data: UpdateOrderDto = {
      id: order.id,
      notes,
      people,
      tableId,
      typeOrder: type
    };

    if (deliveryTime) {
      data.deliveryTime = deliveryTime;
    }

    updateOrder(data);

    closeModal();
  };

  return (
    <Dialog open={open} onClose={closeModal}>
      <DialogTitle
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <Typography variant='h4'>Editar pedido</Typography>

        <IconButton onClick={closeModal}>
          <Close />
        </IconButton>
      </DialogTitle>

      <DialogContent
        sx={{
          maxWidth: '400px'
        }}
      >
        <Grid container spacing={3}>
          <Grid item xs={12}>
            {/* <InputLabel >Tipo de pedido</InputLabel> */}
            <OrderTypeSelector type={type} setType={handleChangeType} />
          </Grid>
          {type === ('IN_PLACE' as TypeOrder) && (
            <>
              <Grid item xs={12} sm={6}>
                <OrderTable tableId={tableId} setTable={handleChangeTable} />
                {type === TypeOrder.IN_PLACE && !tableId && (
                  <Typography color='error'>Seleccione una mesa</Typography>
                )}
              </Grid>
            </>
          )}

          <Grid item xs={12} sm={6}>
            <MobileDateTimePicker
              label='Hora de entrega'
              value={deliveryTime}
              onChange={handleChangeDeliveryTime}
              renderInput={(params) => <TextField {...params} />}
            />
          </Grid>
        </Grid>
        {/* <Divider sx={{ my: 3 }} />

        <Typography>
          Información adicional
        </Typography> */}

        <Grid container spacing={2} mt={1}>
          <Grid item xs={12}>
            <Typography>Personas</Typography>

            <Box
              display='flex'
              justifyContent='space-between'
              alignItems='center'
              mt={1}
            >
              <Pagination
                count={5}
                hidePrevButton
                hideNextButton
                // variant='outlined'
                color='primary'
                page={people || 0}
                onChange={(e, value) => handleChangePeople(value)}
              />

              {!isOpen && (
                <Button variant='outlined' size='small' onClick={handleOpen}>
                  Otro
                </Button>
              )}

              {isOpen && (
                <InputBase
                  value={people || ''}
                  onChange={(e) => {
                    const newValue = Number(e.target.value);
                    if (newValue >= 0) {
                      handleChangePeople(newValue);
                    }
                  }}
                  type='number'
                  inputProps={{
                    min: 0
                  }}
                  sx={{
                    border: (theme) =>
                      `1px solid ${theme.colors.primary.main} `,
                    borderRadius: '8px',
                    padding: '0 8px',
                    width: '80px'
                  }}
                  size='small'
                />
              )}
            </Box>
          </Grid>

          <Grid item xs={12}>
            <TextField
              id='descripcion-pedido'
              label='Notas'
              margin='dense'
              multiline
              rows={4}
              // defaultValue={detail?.description}
              fullWidth
              value={notes}
              onChange={handleChangeNotes}
            />
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button variant='outlined' onClick={closeModal}>
          Cancelar
        </Button>
        <LoadingButton
          variant='contained'
          onClick={submitUpdateOrder}
          startIcon={<Save />}
          loading={isLoading}
          disabled={!isOnline}
        >
          Actualizar
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};
