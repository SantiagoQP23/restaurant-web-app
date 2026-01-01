import {
  Dialog,
  DialogTitle,
  DialogContent,
  Grid,
  TextField,
  Typography
} from '@mui/material';
import { useCashRegisterStore } from '../../Common/store/useCashRegisterStore';
import { LoadingButton } from '@mui/lab';

export const ModalCreateCashRegister = () => {
  const { isOpenCreate, closeCreate } = useCashRegisterStore((state) => state);

  return (
    <Dialog open={isOpenCreate} onClose={closeCreate}>
      <DialogTitle variant='h4'>Crear caja</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant='h4'>Añadir caja</Typography>
          </Grid>

          <Grid item xs={12}>
            <TextField
              label='Monto inicial'
              type='number'
              variant='outlined'
              fullWidth
              // size='small'
              // value={initialAmount}

              // onChange={handleChangeInitialAmount}

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
              // loading={isPending}
              // onClick={onSubmitCreate}
            >
              Añadir
            </LoadingButton>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};
