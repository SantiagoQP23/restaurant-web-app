import { useState, useEffect } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  Typography
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Holiday } from '../../../models/holiday.model';
import { statusModalDeleteHoliday } from '../../../services/holidays.service';
import { useDeleteTypeHoliday } from '../../../hooks/useTypesHolidays';

export const ModalDeleteHoliday = () => {
  const [open, setOpen] = useState(false);

  const [holiday, setHoliday] = useState<Holiday>();

  const suscription$ = statusModalDeleteHoliday.getSubject();

  const closeModal = () => {
    setOpen(false);
    setHoliday(undefined);
  };

  const deleteHolidayMutation = useDeleteTypeHoliday(closeModal);

  useEffect(() => {
    const suscription = suscription$.subscribe((data) => {
      setHoliday(data.holiday);
      setOpen(data.open);
    });
  }, []);

  return (
    <>
      <Dialog open={open} onClose={closeModal}>
        <DialogTitle>
          <Typography variant='h4'>Eliminar feriado</Typography>
        </DialogTitle>

        <DialogContent>
          <Typography variant='h6'>
            ¿Está seguro que desea eliminar el feriado{' '}
            {holiday?.typeHoliday.name}?
          </Typography>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancelar</Button>
          <LoadingButton
            variant='contained'
            color='error'
            onClick={() => deleteHolidayMutation.mutate(holiday!.id)}
            loading={deleteHolidayMutation.isLoading}
          >
            Eliminar
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
};
