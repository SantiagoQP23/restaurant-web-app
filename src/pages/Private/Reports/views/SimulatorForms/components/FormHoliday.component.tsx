import {
  DialogTitle,
  Typography,
  DialogContent,
  Grid,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  DialogActions,
  Button
} from '@mui/material';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import { FC, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Holiday } from '../../../models/holiday.model';
import {
  formatDate,
  formatDateToPicker
} from '../../../../Common/helpers/format-date.helper';
import { CreateHolidayDto } from '../../FootfallSimulation/dto/create-holiday.dto';
import { useTypesHolidays } from '../../../hooks/useTypesHolidays';

interface Props {
  onSubmit: (data: any) => void;
  holiday: CreateHolidayDto;
  loading: boolean;
  isNew: boolean;
  closeModal: () => void;
}

export const FormHoliday: FC<Props> = ({
  holiday,
  onSubmit,
  loading,
  isNew,
  closeModal
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control
  } = useForm<CreateHolidayDto>({
    defaultValues: holiday
  });

  const [date, setDate] = useState<Date | null>(
    formatDateToPicker(holiday.date)
  );

  const handleChange = (newValue: Date | null) => {
    setDate(newValue);
  };

  const addDateAndSubmit = (data: CreateHolidayDto) => {
    onSubmit({ ...data, date: formatDate(date!) });
  };

  const { isLoading, error, data } = useTypesHolidays();

  return (
    <>
      <form onSubmit={handleSubmit(addDateAndSubmit)}>
        <DialogTitle>
          <Typography variant='h4'>Editar feriado</Typography>
        </DialogTitle>

        <DialogContent>
          {holiday && (
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Controller
                  name='typeHolidayId'
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <>
                      <InputLabel id='select-seccion'>
                        Nombre del feriado
                      </InputLabel>
                      <Select
                        labelId='select-seccion'
                        label='Seccion'
                        fullWidth
                        margin='dense'
                        value={value}
                        onChange={onChange}
                        onBlur={onBlur}
                        error={!!errors.typeHolidayId}
                      >
                        {data?.map((holiday) => (
                          <MenuItem key={holiday.id} value={holiday.id}>
                            {holiday.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </>
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <DesktopDatePicker
                  label='Fecha'
                  inputFormat='yyyy-MM-dd'
                  value={date}
                  onChange={handleChange}
                  renderInput={(params) => <TextField {...params} />}
                />
              </Grid>

              <Grid item xs={12}>
                {/* <TextField
                  required
                  {
                  ...register('value', {
                    required: 'Este campo es requerido',
                    valueAsNumber: true


                  }
                  )
                  }
                  error={!!errors.value}
                  helperText={<Typography variant="body1" color="red">{errors.value?.message}</Typography>}
                  label="Valor"
                  type="number"
                  fullWidth
                  margin='dense'
                  inputProps={{
                    step: 0.01,
                  }}
                /> */}
              </Grid>
            </Grid>
          )}
        </DialogContent>

        <DialogActions>
          <Button
            onClick={() => {
              closeModal();
            }}
          >
            Cancelar
          </Button>
          <Button type='submit'>Guardar</Button>
        </DialogActions>
      </form>
    </>
  );
};
