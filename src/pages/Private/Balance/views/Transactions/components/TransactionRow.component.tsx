import React, { FC } from 'react';
import { Transaction } from '../../../models/transaction.model';
import {
  ArrowCircleDown,
  ArrowCircleUp,
  DeleteOutline,
  EditOutlined,
  MoreVert,
  Print
} from '@mui/icons-material';
import {
  TableRow,
  TableCell,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
  IconButton,
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
import { DeleteTransactionModal } from './DeleteTransactionModal.component';
import NiceModal from '@ebay/nice-modal-react';
import { EditTransactionModal } from './EditTransactionModal.component';

interface Props {
  transaction: Transaction;
}

export const TransactionRow: FC<Props> = ({ transaction }) => {
  const popupState = usePopupState({
    variant: 'popover',
    popupId: 'popoverMenuProduct'
  });

  const showDeleteTransactionModal = () => {
    NiceModal.show(DeleteTransactionModal, { transaction });
  };

  const showModalEditTransaction = () => {
    NiceModal.show(EditTransactionModal, { transaction });
  };
  const handleEdit = () => {
    popupState.close();
    showModalEditTransaction();
  };
  const handleDelete = () => {
    popupState.close();
    showDeleteTransactionModal();
  };
  const handlePrint = () => {
    popupState.close();
    // showModalDeleteTransaction();
  };

  return (
    <>
      <TableRow>
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
              primary={transaction.title}
              secondary={transaction.description}
              primaryTypographyProps={{
                variant: 'h5'
              }}
            />
          </ListItem>
        </TableCell>
        <TableCell>
          <ListItem>
            <ListItemText
              primary={`${transaction.createdBy.person.firstName} ${transaction.createdBy.person.lastName}`}
              secondary={format(
                new Date(transaction.createdAt),
                'dd/MM/yyyy HH:mm'
              )}
              primaryTypographyProps={{
                variant: 'h5'
              }}
            />
          </ListItem>
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
          <IconButton {...bindTrigger(popupState)}>
            <MoreVert />
          </IconButton>
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
        <MenuItem onClick={handlePrint}>
          <Print fontSize='small' sx={{ mr: 2 }} />
          Imprimir
        </MenuItem>
      </Popover>
    </>
  );
};
