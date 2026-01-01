import { Controller, useForm } from 'react-hook-form';
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  Stack,
  TextField,
  Typography,
  IconButton,
  Box,
  Select,
  MenuItem,
  Dialog,
  DialogContent,
  useTheme,
  useMediaQuery,
  DialogTitle
} from '@mui/material';
import { useModal } from '../../../../../../hooks';
import { useState } from 'react';
import { Add, Close, CloseOutlined } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { useCashRegisterStore } from '../../../../Common/store/useCashRegisterStore';
import { ModalSelectUser } from '../../../../Users/components/ModalSelectUser.component';
import { IUser } from '../../../../../../models';
import NiceModal, {
  muiDialogV5,
  useModal as useNiceModal
} from '@ebay/nice-modal-react';
import { TransactionType } from '../../../../Common/enums/transaction-type.enum';
import { useTransactionCategories } from '../../../hooks/useTransactionCategories';
import { useCreateCashTransaction } from '../../../hooks/useCashTransactions';
import { CreateCashTransactionDto } from '../../../dto/create-cash-transaction.dto';

interface Props {
  type: TransactionType;
}

export const AddCashTransactionModal = NiceModal.create<Props>(({ type }) => {
  const { handleClose, isOpen, handleOpen } = useModal();

  const modal = useNiceModal();

  const { activeCashRegister } = useCashRegisterStore((state) => state);
  const { data } = useTransactionCategories();

  const [responsibleUser, setResponsibleUser] = useState<IUser | null>(null);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    control,
    reset,
    watch
  } = useForm<CreateCashTransactionDto>({
    defaultValues: {
      description: '',
      amount: 0,
      cashRegisterId: 0,
      categoryId: 0,
      type,
      isEditable: true
    }
  });

  const { isPending, mutateAsync } = useCreateCashTransaction();

  const closeDrawer = () => modal.hide();
  const availableCategories = data?.filter(
    (category) => category.transactionType === type
  );

  const handleChangeResponsible = (user: IUser | null) => {
    setResponsibleUser(user);
  };

  const onSubmit = (form: CreateCashTransactionDto) => {
    if (!activeCashRegister) return;

    if (!responsibleUser) return;

    const data: CreateCashTransactionDto = {
      ...form,
      performedById: responsibleUser.id,
      cashRegisterId: activeCashRegister?.id
    };

    mutateAsync(data).then(() => {
      reset();
      handleClose();
      closeDrawer();
    });
  };

  const isFormValid =
    responsibleUser &&
    activeCashRegister &&
    watch('categoryId') !== 0 &&
    watch('amount') > 0 &&
    watch('description') !== '';

  return (
    <>
      <ModalSelectUser
        open={isOpen}
        onClose={handleClose}
        onChange={handleChangeResponsible}
        value={responsibleUser}
      />

      <Dialog {...muiDialogV5(modal)} fullScreen={fullScreen} maxWidth='xs'>
        <DialogTitle>
          <Stack
            direction='row'
            justifyContent='space-between'
            alignItems='center'
          >
            <Box>
              <Typography variant='h4'>
                Nuevo {type === TransactionType.INCOME ? 'ingreso' : 'gasto'}
              </Typography>
            </Box>
            <Stack direction='row' spacing={2} alignItems='center'>
              <IconButton onClick={closeDrawer} size='small'>
                <CloseOutlined fontSize='small' />
              </IconButton>
            </Stack>
          </Stack>
        </DialogTitle>

        <DialogContent>
          {/* <Divider sx={{ mb: 2 }} /> */}
          <FormControl
            fullWidth
            component='form'
            onSubmit={handleSubmit(onSubmit)}
            margin='dense'
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label='Título'
                  type='text'
                  fullWidth
                  {...register('description', {
                    required: 'Este campo es requerido',
                    minLength: { value: 2, message: 'Minimo 2 caracteres' }
                  })}
                  rows={2}
                  error={!!errors.description}
                  helperText={errors.description?.message}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label='Monto'
                  type='number'
                  fullWidth
                  inputProps={{ step: 0.05, min: 0.05 }}
                  {...register('amount', {
                    required: 'Este campo es requerido',
                    min: {
                      value: 0.05,
                      message: 'Debe ser mayor a 5 centavos'
                    },
                    valueAsNumber: true
                  })}
                  error={!!errors.amount}
                  helperText={errors.amount?.message}
                />
              </Grid>

              <Grid item xs={12}>
                <Stack
                  direction='row'
                  spacing={2}
                  justifyContent='space-between'
                  alignItems='center'
                >
                  <Typography variant='subtitle2'>Responsable</Typography>
                  <Box>
                    <Button onClick={handleOpen}>
                      {responsibleUser ? 'Cambiar' : 'Seleccionar'}
                    </Button>
                    {responsibleUser && (
                      <IconButton
                        color='error'
                        onClick={() => handleChangeResponsible(null)}
                      >
                        <Close />
                      </IconButton>
                    )}
                  </Box>
                </Stack>
                <Typography variant='h6'>
                  {responsibleUser
                    ? `${responsibleUser.person.firstName} ${responsibleUser.person.lastName} `
                    : 'No seleccionado'}
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <Controller
                  name='categoryId'
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <FormControl fullWidth sx={{ zIndex: 10000 }}>
                      <InputLabel>Categoría</InputLabel>
                      <Select
                        onChange={onChange}
                        label='Categoría'
                        value={value}
                      >
                        {availableCategories?.map((category) => (
                          <MenuItem key={category.id} value={category.id}>
                            {category.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  )}
                />
              </Grid>

              <Grid item xs={12}>
                <LoadingButton
                  variant='contained'
                  color='primary'
                  type='submit'
                  loading={isPending}
                  fullWidth
                  startIcon={<Add />}
                  disabled={!isDirty || !isFormValid}
                >
                  Añadir {type === TransactionType.INCOME ? 'ingreso' : 'gasto'}
                </LoadingButton>
              </Grid>
            </Grid>
          </FormControl>
          {/* </Scrollbar> */}
        </DialogContent>
      </Dialog>
    </>
  );
});
