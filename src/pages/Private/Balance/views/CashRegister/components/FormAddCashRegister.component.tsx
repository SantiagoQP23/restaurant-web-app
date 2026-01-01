import { LoadingButton } from '@mui/lab';
import { Grid, Typography, TextField } from '@mui/material';
import { CreateCashRegisterDto } from '../../../dto/create-cash-register.dto';
import { FC, useState } from 'react';
import { useCreateCashRegister } from '../../../hooks/useCashRegister';
import { format } from 'date-fns';

interface Props {
  onSuccess: () => void;
}

export const FormAddCashRegister: FC<Props> = ({ onSuccess }) => {
  const [initialAmount, setInitialAmount] = useState<number>(0);

  const { mutateAsync, isPending } = useCreateCashRegister();

  const handleChangeInitialAmount = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setInitialAmount(Number(event.target.value));
  };

  const onSubmitCreate = async () => {
    const data: CreateCashRegisterDto = {
      initialAmount
    };
    await mutateAsync(data).then(() => {
      setInitialAmount(0);
      onSuccess();
    });
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} display='flex' justifyContent='space-between'>
          <Typography>Hora de apertura</Typography>
          <Typography variant='h6'>
            {format(new Date(), 'dd/MM/yyyy HH:mm')}
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <TextField
            label='Monto inicial'
            type='number'
            variant='outlined'
            fullWidth
            // size='small'
            value={initialAmount}
            onChange={handleChangeInitialAmount}
            InputProps={{
              startAdornment: <Typography variant='h6'>$ </Typography>,
              inputProps: {
                min: 0
              }
            }}
          />
        </Grid>

        <Grid item xs={12}>
          <LoadingButton
            variant='contained'
            fullWidth
            loading={isPending}
            onClick={onSubmitCreate}
          >
            Añadir
          </LoadingButton>
        </Grid>
      </Grid>
    </>
  );
};
