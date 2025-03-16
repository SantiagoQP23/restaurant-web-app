import React, { FC } from 'react';
import { CashTransaction } from '../../../models/cash-transaction.model';
import {
  ArrowCircleDown,
  ArrowCircleUp,
  DeleteOutline,
  EditOutlined,
  MoreVert,
  Print,
  Visibility
} from '@mui/icons-material';
import {
  TableRow,
  TableCell,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
  IconButton,
  Stack,
  Popover,
  MenuItem
} from '@mui/material';
import { format } from 'date-fns';
import { TransactionType } from '../../../../Common/enums/transaction-type.enum';
import { formatMoney } from '../../../../Common/helpers/format-money.helper';
import {
  bindPopover,
  bindTrigger,
  usePopupState
} from 'material-ui-popup-state/hooks';
import NiceModal from '@ebay/nice-modal-react';
import { DeleteCashTransactionModal } from './DeleteCashTransactionModal.component';
import { EditCashTransactionModal } from './EditCashTransactionModal.component';
import { CashTransactionDetailsDrawer } from './CashTransactionDetailsDrawer.component';

interface Props {
  transaction: CashTransaction;
}

export const CashTransactionRow: FC<Props> = ({ transaction }) => {
  const popupState = usePopupState({
    variant: 'popover',
    popupId: 'popoverCashTransaction'
  });

  const showDeleteCashTransactionModal = () =>
    NiceModal.show(DeleteCashTransactionModal, { transaction });

  const showModalEditCashTransaction = () =>
    NiceModal.show(EditCashTransactionModal, { cashTransaction: transaction });

  const showCashTransactionDrawer = () =>
    NiceModal.show(CashTransactionDetailsDrawer, { transaction });

  const handleEdit = () => {
    popupState.close();
    showModalEditCashTransaction();
  };

  const handleDelete = () => {
    popupState.close();
    showDeleteCashTransactionModal();
  };

  const handlePrint = () => {
    popupState.close();
    // showDeleteTransactionModal();
  };

  const handleSeeDetails = () => {
    popupState.close();
    showCashTransactionDrawer();
  };

  return (
    <>
      <TableRow key={transaction.id}>
        <TableCell>
          <ListItem>
            <ListItemAvatar>
              {transaction.type === TransactionType.INCOME ? (
                <ArrowCircleDown color='success' />
              ) : (
                <ArrowCircleUp color='error' />
              )}
            </ListItemAvatar>
            <ListItemText
              primary={transaction.description}
              secondary={format(
                new Date(transaction.createdAt),
                'dd/MM/yyyy HH:mm'
              )}
              primaryTypographyProps={{
                variant: 'h4'
              }}
            />
          </ListItem>
        </TableCell>
        <TableCell>
          <Typography variant='h5'>
            {transaction.createdBy.person.firstName}{' '}
            {transaction.createdBy.person.lastName}
          </Typography>
        </TableCell>

        <TableCell>
          {transaction.type === TransactionType.INCOME ? (
            <Typography color='success.main'>
              + {formatMoney(transaction.amount)}
            </Typography>
          ) : (
            <Typography color='error.main'>
              - {formatMoney(transaction.amount)}
            </Typography>
          )}
        </TableCell>
        <TableCell align='center'>
          <Stack direction='row' spacing={2} justifyContent='center'>
            <IconButton {...bindTrigger(popupState)}>
              <MoreVert />
            </IconButton>
          </Stack>
        </TableCell>
      </TableRow>

      <Popover
        {...bindPopover(popupState)}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        slotProps={{
          paper: {
            sx: {
              width: 140
            }
          }
        }}
      >
        {transaction.isEditable && (
          <MenuItem onClick={handleEdit}>
            <EditOutlined fontSize='small' sx={{ mr: 2 }} />
            Editar
          </MenuItem>
        )}
        <MenuItem onClick={handlePrint}>
          <Print fontSize='small' sx={{ mr: 2 }} />
          Imprimir
        </MenuItem>
        <MenuItem onClick={handleSeeDetails}>
          <Visibility fontSize='small' sx={{ mr: 2 }} />
          Ver detalles
        </MenuItem>
        {transaction.isEditable && (
          <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
            <DeleteOutline fontSize='small' sx={{ mr: 2 }} />
            Eliminar
          </MenuItem>
        )}
      </Popover>
    </>
  );
};
