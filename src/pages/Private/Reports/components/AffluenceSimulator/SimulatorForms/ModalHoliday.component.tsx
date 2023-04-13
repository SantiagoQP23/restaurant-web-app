import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField, Typography, Select, InputLabel, MenuItem, Box } from '@mui/material';
import { useContext, useState } from 'react';
import { Holiday, } from '../models/holiday.model';
import { useEffect } from 'react';
import { statusModalHoliday, updateHoliday, createHoliday as createHolidayS } from '../services/holidays.service';

import { UpdateHolidayDto } from '../dto/update-holiday.dto';
import { useFetchAndLoad } from '../../../../../../hooks/useFetchAndLoad';
import { useSnackbar } from 'notistack';
import { SimulationContext } from '../../../context/SimulationContext';
import { FormHoliday } from './FormHoliday.component';
import { CreateHolidayDto } from '../dto/create-holiday.dto';
import { formatDate, formatDateToPicker } from '../../../../helpers/format-date.helper';
import { useCreateTypeHoliday, useTypesHolidays, useUpdateTypeHoliday } from '../../../hooks/useTypesHolidays';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import { LoadingButton } from '@mui/lab';
import { useMutation } from '@tanstack/react-query';
import { queryClient } from '../../../../../../main';


export const ModalHoliday = () => {

  const [open, setOpen] = useState(false);

  const [holiday, setHoliday] = useState<Holiday>();

  const [date, setDate] = useState<Date | null>(null);
  const [typeHolidayId, setTypeHolidayId] = useState<string>();


  
  const closeModal = () => {
    setOpen(false);
    setHoliday(undefined);
  }
  
  const addHolidayMutation = useCreateTypeHoliday(closeModal);

  const updateHolidayMutation = useUpdateTypeHoliday(closeModal);


  const { enqueueSnackbar } = useSnackbar();

  const suscription$ = statusModalHoliday.getSubject();

  const holidaysQuery = useTypesHolidays();



  const validErrors = () => {
    return (!typeHolidayId && typeHolidayId?.length === 0)

  }

  const onSubmit = async () => {

    console.log({ date, typeHolidayId });

    if (validErrors()) return;

    if (!holiday) {
      const data: CreateHolidayDto = {
        date: formatDate(date!),
        typeHolidayId: typeHolidayId!,

      }


      addHolidayMutation.mutate(data);

    } else {
      const data: UpdateHolidayDto = {
        id: holiday.id,
        date: formatDate(date!),
        typeHolidayId: typeHolidayId!,
      }

      updateHolidayMutation.mutate(data);



    }





  }
  const handleChangeDate = (newValue: Date | null) => {
    setDate(newValue);
  };




  useEffect(() => {

    const suscription = suscription$.subscribe((data) => {

      const { holiday } = data;
      setOpen(data.open);

      if (holiday) {

        setHoliday(holiday);
        setDate(formatDateToPicker(new Date(holiday.date)));
        setTypeHolidayId(holiday.typeHoliday.id);



      } else {

        setTypeHolidayId('');
        setDate(formatDateToPicker(new Date()));

      }



    });



  }, [])


  return (
    <>
      <Dialog open={open} onClose={closeModal} fullWidth maxWidth='xs'>

        <DialogTitle>
          <Typography variant='h4'>{holiday ? 'Editar' : 'Crear'} feriado</Typography>
        </DialogTitle>

        <DialogContent>


          <InputLabel id='select-seccion'>Nombre del feriado</InputLabel>
          <Select
            labelId="select-seccion"

            label="Seccion"
            fullWidth
            margin='dense'
            value={typeHolidayId}
            onChange={(e) => setTypeHolidayId(e.target.value)}

          >
            {
              holidaysQuery.data?.map((typeHoliday) => (
                <MenuItem key={typeHoliday.id} value={typeHoliday.id}>{typeHoliday.name}</MenuItem>
              ))
            }




          </Select>

          <Box mt={2}
            width='100%'
          >


            <DesktopDatePicker
              label="Fecha"
              inputFormat="yyyy-MM-dd"
              value={date}
              onChange={handleChangeDate}
              renderInput={(params) => <TextField {...params} />}


            />
          </Box>

        </DialogContent>

        <DialogActions>
          <Button onClick={closeModal}>Cancelar</Button>
          <LoadingButton
            onClick={onSubmit}
            variant='contained'
            loading={addHolidayMutation.isLoading}

          >
            Guardar
          </LoadingButton>
        </DialogActions>



      </Dialog>

    </>
  )
}