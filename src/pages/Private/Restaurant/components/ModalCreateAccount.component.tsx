import NiceModal, { muiDialogV5, useModal } from '@ebay/nice-modal-react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField
} from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';
import { Save } from '@mui/icons-material';
import { AccountType } from '../../../../models/financial/account.model';
import { CreateAccountDto } from '../dto/create-account.dto';
import { useCreateAccount } from '../hooks/useAccounts';

export const ModalCreateAccount = NiceModal.create(() => {
  const modal = useModal();
  const { isPending, mutateAsync } = useCreateAccount();

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors, isDirty }
  } = useForm<CreateAccountDto>({
    defaultValues: {
      name: '',
      description: '',
      num: '',
      type: AccountType.CASH
    }
  });

  const accountType = watch('type');

  const onSubmit = (data: CreateAccountDto) => {
    mutateAsync(data).then(() => modal.hide());
  };

  return (
    <Dialog {...muiDialogV5(modal)} fullWidth maxWidth='sm'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle variant='h5'>Crear cuenta</DialogTitle>

        <DialogContent>
          <Controller
            name='type'
            control={control}
            rules={{ required: 'Este campo es requerido' }}
            render={({ field }) => (
              <FormControl fullWidth sx={{ mt: 1 }}>
                <InputLabel id='account-type-label'>Tipo</InputLabel>
                <Select
                  labelId='account-type-label'
                  label='Tipo'
                  {...field}
                  error={!!errors.type}
                >
                  <MenuItem value={AccountType.CASH}>Efectivo</MenuItem>
                  <MenuItem value={AccountType.BANK}>Banco</MenuItem>
                </Select>
              </FormControl>
            )}
          />

          <TextField
            sx={{ mt: 2 }}
            autoFocus
            label='Nombre'
            type='text'
            fullWidth
            {...register('name', {
              required: 'Este campo es requerido',
              minLength: { value: 2, message: 'Mínimo 2 caracteres' }
            })}
            error={!!errors.name}
            helperText={errors.name?.message}
          />

          <TextField
            sx={{ mt: 2 }}
            label='Descripción'
            type='text'
            fullWidth
            multiline
            rows={2}
            {...register('description')}
          />

          {accountType === AccountType.BANK && (
            <TextField
              sx={{ mt: 2 }}
              label='Número de cuenta'
              type='text'
              fullWidth
              {...register('num')}
              error={!!errors.num}
              helperText={errors.num?.message}
            />
          )}
        </DialogContent>

        <DialogActions>
          <Button onClick={() => modal.hide()}>Cancelar</Button>
          <LoadingButton
            loading={isPending}
            type='submit'
            variant='contained'
            disabled={!isDirty}
            startIcon={<Save />}
          >
            Guardar
          </LoadingButton>
        </DialogActions>
      </form>
    </Dialog>
  );
});
