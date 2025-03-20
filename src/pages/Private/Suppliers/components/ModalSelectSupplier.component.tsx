import {
  Button,
  Dialog,
  DialogTitle,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Stack,
  Typography
} from '@mui/material';
import { FC } from 'react';
import { useSuppliers } from '../hooks/useSuppliers';
import { Add, Close } from '@mui/icons-material';
import { Supplier } from '../models/supplier.model';

interface Props {
  onChange: (supplier: Supplier | null) => void;

  onClose: () => void;

  open: boolean;
}

export const ModalSelectSupplier: FC<Props> = ({ open, onClose, onChange }) => {
  const { suppliersQuery } = useSuppliers();

  const handleChange = (supplier: Supplier) => {
    onChange(supplier);
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth='md'
      sx={{
        zIndex: 2000
      }}
    >
      <DialogTitle
        display='flex'
        justifyContent='space-between'
        alignItems='center'
      >
        <Typography variant='h4'>Proveedores</Typography>
        <IconButton onClick={onClose}>
          <Close />
        </IconButton>
      </DialogTitle>

      <List sx={{ width: 325 }}>
        {suppliersQuery.data?.map((supplier) => (
          <ListItem key={supplier.id}>
            <ListItemText
              primary={
                supplier.person.firstName + ' ' + supplier.person.lastName
              }
              secondary={supplier.person.email}
            />

            <ListItemSecondaryAction>
              <Button
                startIcon={<Add />}
                color='inherit'
                size='small'
                onClick={() => handleChange(supplier)}
              >
                seleccionar
              </Button>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
};
