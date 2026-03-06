import NiceModal, { muiDialogV5, useModal } from '@ebay/nice-modal-react';
import {
  Box,
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Tooltip,
  Typography
} from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { LoadingButton } from '@mui/lab';
import {
  AccountBalanceOutlined,
  AccountBalanceWalletOutlined,
  CheckCircle,
  Percent,
  Save,
  StarOutlined
} from '@mui/icons-material';
import { PaymentMethodCategory } from '../../../../models/financial/payment-method.model';
import { CreatePaymentMethodDto } from '../dto/create-payment-method.dto';
import { useCreatePaymentMethod } from '../hooks/usePaymentMethods';
import { useAccounts } from '../hooks/useAccounts';
import {
  Account,
  AccountType
} from '../../../../models/financial/account.model';

const CATEGORY_LABELS: Record<PaymentMethodCategory, string> = {
  [PaymentMethodCategory.CASH]: 'Efectivo',
  [PaymentMethodCategory.CARD]: 'Tarjeta',
  [PaymentMethodCategory.TRANSFER]: 'Transferencia',
  [PaymentMethodCategory.DIGITAL_WALLET]: 'Billetera digital',
  [PaymentMethodCategory.OTHER]: 'Otro'
};

interface AccountCardProps {
  account: Account;
  selected: boolean;
  isDefault?: boolean;
  onClick: () => void;
}

const AccountCard = ({
  account,
  selected,
  isDefault,
  onClick
}: AccountCardProps) => (
  <Tooltip title={isDefault ? 'Cuenta por defecto' : ''} placement='top'>
    <Card
      variant='outlined'
      onClick={onClick}
      sx={{
        px: 1.5,
        py: 1,
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        borderColor: selected ? 'primary.main' : 'divider',
        borderWidth: selected ? 2 : 1,
        bgcolor: selected ? 'primary.50' : 'background.paper',
        transition: 'border-color 0.15s, background-color 0.15s',
        '&:hover': { borderColor: 'primary.light' }
      }}
    >
      {account.type === AccountType.BANK ? (
        <AccountBalanceOutlined
          fontSize='small'
          color={selected ? 'primary' : 'disabled'}
        />
      ) : (
        <AccountBalanceWalletOutlined
          fontSize='small'
          color={selected ? 'primary' : 'disabled'}
        />
      )}
      <Typography
        variant='body2'
        noWrap
        sx={{ flex: 1, fontWeight: selected ? 600 : 400 }}
      >
        {account.name}
        {account.num ? ` · #${account.num}` : ''}
      </Typography>
      {isDefault && <StarOutlined fontSize='small' color='primary' />}
      {selected && !isDefault && (
        <CheckCircle fontSize='small' color='primary' />
      )}
    </Card>
  </Tooltip>
);

export const ModalCreatePaymentMethod = NiceModal.create(() => {
  const modal = useModal();
  const { isPending, mutateAsync } = useCreatePaymentMethod();
  const { data: accounts = [] } = useAccounts();

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors, isDirty }
  } = useForm<CreatePaymentMethodDto>({
    defaultValues: {
      name: CATEGORY_LABELS[PaymentMethodCategory.CASH],
      type: PaymentMethodCategory.CASH,
      commissionPercentage: undefined,
      defaultDestinationAccountId: undefined,
      allowedDestinationAccountIds: []
    }
  });

  const paymentType = watch('type');
  const allowedIds = watch('allowedDestinationAccountIds') ?? [];
  const defaultId = watch('defaultDestinationAccountId');
  const showCommission = paymentType !== PaymentMethodCategory.CASH;

  // Filter available accounts based on payment type
  const accountTypeFilter =
    paymentType === PaymentMethodCategory.CASH
      ? AccountType.CASH
      : AccountType.BANK;
  const filteredAccounts = accounts.filter((a) => a.type === accountTypeFilter);

  // Allowed accounts already selected
  const selectedAccounts = filteredAccounts.filter((a) =>
    allowedIds.includes(a.id)
  );

  // Reset account selections whenever the payment type changes
  useEffect(() => {
    setValue('allowedDestinationAccountIds', []);
    setValue('defaultDestinationAccountId', undefined);
    setValue('name', CATEGORY_LABELS[paymentType]);
  }, [paymentType, setValue]);

  const toggleAllowed = (
    accountId: number,
    currentIds: number[],
    onChange: (ids: number[]) => void
  ) => {
    const next = currentIds.includes(accountId)
      ? currentIds.filter((id) => id !== accountId)
      : [...currentIds, accountId];
    onChange(next);
    // If we just deselected the default account, clear it
    if (!next.includes(accountId) && defaultId === accountId) {
      setValue('defaultDestinationAccountId', undefined);
    }
  };

  const onSubmit = (data: CreatePaymentMethodDto) => {
    mutateAsync(data).then(() => modal.hide());
  };

  return (
    <Dialog {...muiDialogV5(modal)} fullWidth maxWidth='sm'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle variant='h5'>Crear método de pago</DialogTitle>

        <DialogContent>
          {/* Type */}
          <Controller
            name='type'
            control={control}
            rules={{ required: 'Este campo es requerido' }}
            render={({ field }) => (
              <FormControl fullWidth sx={{ mt: 1 }}>
                <InputLabel id='pm-type-label'>Tipo</InputLabel>
                <Select
                  labelId='pm-type-label'
                  label='Tipo'
                  {...field}
                  error={!!errors.type}
                >
                  {Object.values(PaymentMethodCategory).map((cat) => (
                    <MenuItem key={cat} value={cat}>
                      {CATEGORY_LABELS[cat]}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          />

          {/* Name */}
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

          {/* Commission — hidden for CASH */}
          {showCommission && (
            <TextField
              sx={{ mt: 2 }}
              label='Comisión'
              type='number'
              fullWidth
              inputProps={{ min: 0, max: 100, step: 0.1 }}
              InputProps={{ endAdornment: <Percent fontSize='small' /> }}
              {...register('commissionPercentage', {
                min: { value: 0, message: 'Mínimo 0' },
                max: { value: 100, message: 'Máximo 100' },
                valueAsNumber: true
              })}
              error={!!errors.commissionPercentage}
              helperText={errors.commissionPercentage?.message}
            />
          )}

          {/* Allowed destination accounts */}
          {filteredAccounts.length > 0 && (
            <Box mt={2}>
              <Typography variant='caption' color='text.secondary'>
                Cuentas destino permitidas
              </Typography>
              <Controller
                name='allowedDestinationAccountIds'
                control={control}
                render={({ field }) => (
                  <Stack direction='row' flexWrap='wrap' gap={1} mt={0.5}>
                    {filteredAccounts.map((account) => (
                      <AccountCard
                        key={account.id}
                        account={account}
                        selected={allowedIds.includes(account.id)}
                        isDefault={defaultId === account.id}
                        onClick={() =>
                          toggleAllowed(
                            account.id,
                            field.value ?? [],
                            field.onChange
                          )
                        }
                      />
                    ))}
                  </Stack>
                )}
              />
            </Box>
          )}

          {/* Default destination account — only shown when allowed accounts are selected */}
          {selectedAccounts.length > 0 && (
            <Box mt={2}>
              <Typography variant='caption' color='text.secondary'>
                Cuenta por defecto (selecciona una)
              </Typography>
              <Controller
                name='defaultDestinationAccountId'
                control={control}
                rules={{ required: 'Selecciona una cuenta por defecto' }}
                render={({ field }) => (
                  <Stack direction='row' flexWrap='wrap' gap={1} mt={0.5}>
                    {selectedAccounts.map((account) => (
                      <AccountCard
                        key={account.id}
                        account={account}
                        selected={field.value === account.id}
                        isDefault={field.value === account.id}
                        onClick={() => field.onChange(account.id)}
                      />
                    ))}
                  </Stack>
                )}
              />
            </Box>
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
