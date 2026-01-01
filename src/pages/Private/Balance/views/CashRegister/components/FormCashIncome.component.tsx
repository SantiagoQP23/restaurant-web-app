import { FC, useState } from 'react';

import { Button, Grid } from '@mui/material/';
import { TextField } from '@mui/material';
import { Add } from '@mui/icons-material';

import { LoadingButton } from '@mui/lab';
// import { CreateCashIncomeDto } from '../../../dto/create-cash-transaction.dto';

interface Props {
  handleClose: () => void;
  cashRegisterId: string;
}

export const FormCashIncome: FC<Props> = ({ handleClose }) => {
  // const { mutateAsync, isPending } = useCreateCashIncome();

  const [amount, setAmount] = useState<number>(0);

  const handleChangeAmount = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);

    setAmount(value);
  };

  const handleSubmit = () => {};

  return (
    <>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <TextField
            label='Monto'
            variant='outlined'
            size='small'
            type='number'
            fullWidth
            value={amount}
            onChange={handleChangeAmount}
          />
        </Grid>

        <Grid item xs={12} display='flex' justifyContent='right' gap={1}>
          <Button
            color='inherit'
            size='small'
            onClick={handleClose}
            // startIcon={<Close />}
          >
            Cancelar
          </Button>

          <LoadingButton
            color='success'
            startIcon={<Add />}
            size='small'
            variant='contained'
            onClick={handleSubmit}
          >
            Añadir dinero
          </LoadingButton>
        </Grid>
      </Grid>
    </>
  );
};
