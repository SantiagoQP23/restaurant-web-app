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
import {
  Account,
  AccountType
} from '../../../../models/financial/account.model';
import { UpdateAccountDto } from '../dto/update-account.dto';
import { useUpdateAccount } from '../hooks/useAccounts';

interface Props {
  account: Account;
}

export const ModalEditAccount = NiceModal.create<Props>(({ account }) => {
  const modal = useModal();
  const { isPending, mutateAsync } = useUpdateAccount();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isDirty }
  } = useForm<UpdateAccountDto>({
    defaultValues: {
      name: account.name,
      description: account.description,
      num: account.num,
      type: account.type
    }
  });

  const onSubmit = (data: UpdateAccountDto) => {
    mutateAsync({ id: account.id, dto: data }).then(() => modal.hide());
  };

  return (
    <Dialog {...muiDialogV5(modal)} fullWidth maxWidth='sm'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle variant='h5'>Editar cuenta</DialogTitle>

        <DialogContent>
          <TextField
            sx={{ mt: 1 }}
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

          <TextField
            sx={{ mt: 2 }}
            label='Número de cuenta'
            type='text'
            fullWidth
            {...register('num')}
          />

          <Controller
            name='type'
            control={control}
            rules={{ required: 'Este campo es requerido' }}
            render={({ field }) => (
              <FormControl fullWidth sx={{ mt: 2 }}>
                <InputLabel id='account-type-edit-label'>Tipo</InputLabel>
                <Select
                  labelId='account-type-edit-label'
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
