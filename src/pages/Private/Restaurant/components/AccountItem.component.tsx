import { FC } from 'react';
import {
  Card,
  CardContent,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Popover,
  Chip
} from '@mui/material';
import {
  AccountBalanceOutlined,
  AccountBalanceWalletOutlined,
  EditOutlined,
  MoreVert,
  Reply,
  ToggleOffOutlined
} from '@mui/icons-material';
import {
  bindPopover,
  bindTrigger,
  usePopupState
} from 'material-ui-popup-state/hooks';
import NiceModal from '@ebay/nice-modal-react';
import {
  Account,
  AccountType
} from '../../../../models/financial/account.model';
import { useUpdateAccount } from '../hooks/useAccounts';
import { ModalEditAccount } from './ModalEditAccount.component';

interface Props {
  account: Account;
}

export const AccountItem: FC<Props> = ({ account }) => {
  const { mutate: update } = useUpdateAccount();

  const popupState = usePopupState({
    variant: 'popover',
    popupId: `account-menu-${account.id}`
  });

  const handleEdit = () => {
    popupState.close();
    NiceModal.show(ModalEditAccount, { account });
  };

  const handleToggleActive = () => {
    popupState.close();
    update({ id: account.id, dto: { isActive: !account.isActive } });
  };

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
          {account.type === AccountType.BANK ? (
            <AccountBalanceOutlined />
          ) : (
            <AccountBalanceWalletOutlined />
          )}
        </ListItemIcon>

        <ListItemText
          primary={account.name}
          secondary={
            <>
              {account.num && `#${account.num} · `}
              {account.description}
            </>
          }
          primaryTypographyProps={{
            variant: 'subtitle1',
            color: account.isActive ? 'text.primary' : 'text.disabled'
          }}
          secondaryTypographyProps={{
            variant: 'caption',
            noWrap: true
          }}
        />

        <Chip
          label={account.type === AccountType.BANK ? 'Banco' : 'Efectivo'}
          size='small'
          variant='outlined'
          sx={{ mr: 5, flexShrink: 0 }}
          color={account.isActive ? 'default' : 'default'}
        />

        <Popover
          {...bindPopover(popupState)}
          anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          slotProps={{
            paper: {
              sx: { width: 170, p: 1 }
            }
          }}
        >
          <MenuItem onClick={handleEdit}>
            <EditOutlined fontSize='small' sx={{ mr: 2 }} />
            Editar
          </MenuItem>

          {account.isActive ? (
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
