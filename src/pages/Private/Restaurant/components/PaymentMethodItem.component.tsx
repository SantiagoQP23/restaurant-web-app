import { FC } from 'react';
import {
  Card,
  Chip,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Popover,
  Stack,
  Typography
} from '@mui/material';
import {
  AccountBalanceWalletOutlined,
  CreditCardOutlined,
  EditOutlined,
  MoreVert,
  Reply,
  SwapHorizOutlined,
  ToggleOffOutlined,
  WalletOutlined
} from '@mui/icons-material';
import {
  bindPopover,
  bindTrigger,
  usePopupState
} from 'material-ui-popup-state/hooks';
import NiceModal from '@ebay/nice-modal-react';
import {
  PaymentMethod,
  PaymentMethodCategory
} from '../../../../models/financial/payment-method.model';
import { useUpdatePaymentMethod } from '../hooks/usePaymentMethods';
import { ModalEditPaymentMethod } from './ModalEditPaymentMethod.component';

const CATEGORY_LABELS: Record<PaymentMethodCategory, string> = {
  [PaymentMethodCategory.CASH]: 'Efectivo',
  [PaymentMethodCategory.CARD]: 'Tarjeta',
  [PaymentMethodCategory.TRANSFER]: 'Transferencia',
  [PaymentMethodCategory.DIGITAL_WALLET]: 'Billetera digital',
  [PaymentMethodCategory.OTHER]: 'Otro'
};

const CategoryIcon: FC<{ type: PaymentMethodCategory }> = ({ type }) => {
  switch (type) {
    case PaymentMethodCategory.CARD:
      return <CreditCardOutlined />;
    case PaymentMethodCategory.TRANSFER:
      return <SwapHorizOutlined />;
    case PaymentMethodCategory.DIGITAL_WALLET:
      return <WalletOutlined />;
    case PaymentMethodCategory.CASH:
    default:
      return <AccountBalanceWalletOutlined />;
  }
};

interface Props {
  paymentMethod: PaymentMethod;
}

export const PaymentMethodItem: FC<Props> = ({ paymentMethod }) => {
  const { mutate: update } = useUpdatePaymentMethod();

  const popupState = usePopupState({
    variant: 'popover',
    popupId: `pm-menu-${paymentMethod.id}`
  });

  const handleEdit = () => {
    popupState.close();
    NiceModal.show(ModalEditPaymentMethod, { paymentMethod });
  };

  const handleToggleActive = () => {
    popupState.close();
    update({
      id: paymentMethod.id,
      dto: { isActive: !paymentMethod.isActive }
    });
  };

  const showCommission =
    paymentMethod.type !== PaymentMethodCategory.CASH &&
    paymentMethod.commissionPercentage > 0;

  return (
    <Card sx={{ p: 1 }} variant='outlined'>
      <ListItem
        secondaryAction={
          <IconButton {...bindTrigger(popupState)} size='small'>
            <MoreVert />
          </IconButton>
        }
      >
        <ListItemIcon>
          <CategoryIcon type={paymentMethod.type} />
        </ListItemIcon>

        <ListItemText
          primary={
            <Stack direction='row' alignItems='center' gap={1} flexWrap='wrap'>
              <Typography
                variant='subtitle1'
                color={
                  paymentMethod.isActive ? 'text.primary' : 'text.disabled'
                }
              >
                {paymentMethod.name}
              </Typography>
              <Chip
                label={CATEGORY_LABELS[paymentMethod.type]}
                size='small'
                variant='outlined'
              />
            </Stack>
          }
          secondary={
            <Stack direction='row' gap={1} flexWrap='wrap' mt={0.25}>
              {showCommission && (
                <Typography variant='caption' color='text.secondary'>
                  {paymentMethod.commissionPercentage}% comisión
                </Typography>
              )}
              {paymentMethod.allowedDestinationAccounts?.length > 0 && (
                <Typography variant='caption' color='text.secondary'>
                  {paymentMethod.allowedDestinationAccounts
                    .map((a) => a.name)
                    .join(', ')}
                </Typography>
              )}
            </Stack>
          }
        />

        <Popover
          {...bindPopover(popupState)}
          anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          slotProps={{
            paper: { sx: { width: 170, p: 1 } }
          }}
        >
          <MenuItem onClick={handleEdit}>
            <EditOutlined fontSize='small' sx={{ mr: 2 }} />
            Editar
          </MenuItem>

          {paymentMethod.isActive ? (
            <MenuItem sx={{ color: 'error.main' }} onClick={handleToggleActive}>
              <ToggleOffOutlined fontSize='small' sx={{ mr: 2 }} />
              Desactivar
            </MenuItem>
          ) : (
            <MenuItem onClick={handleToggleActive}>
              <Reply fontSize='small' sx={{ mr: 2 }} />
              Habilitar
            </MenuItem>
          )}
        </Popover>
      </ListItem>
    </Card>
  );
};
