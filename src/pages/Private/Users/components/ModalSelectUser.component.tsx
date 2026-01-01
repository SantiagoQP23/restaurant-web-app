import { FC } from 'react';
import { Add, Close, Done } from '@mui/icons-material';
import {
  Dialog,
  Stack,
  DialogTitle,
  Typography,
  IconButton,
  DialogContent,
  Paper,
  InputBase,
  CircularProgress,
  Box,
  ListItemText,
  List,
  ListItem,
  ListItemSecondaryAction
} from '@mui/material';
import { IUser } from '../../../../models';
import { useUsers } from '../hooks/useUsers';
import SearchIcon from '@mui/icons-material/Search';
import { Scrollbar } from '../../components';

interface Props {
  onChange: (user: IUser | null) => void;
  onClose: () => void;
  open: boolean;
  value: IUser | null;
}

export const ModalSelectUser: FC<Props> = ({
  open,
  onClose,
  onChange,
  value
}) => {
  const { usersQuery, handleChangeSearch, search } = useUsers();

  const handleChange = (user: IUser) => {
    onChange(user);
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth='sm'
      sx={{
        zIndex: 10500
      }}
    >
      <DialogTitle
        display='flex'
        justifyContent='space-between'
        alignItems='center'
      >
        <Typography variant='h4'>Usuarios</Typography>
        <IconButton onClick={onClose}>
          <Close />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <Paper
          component='form'
          sx={{ p: '2px 4px', display: 'flex', alignItems: 'center' }}
          elevation={1}
        >
          <InputBase
            type='text'
            onChange={handleChangeSearch}
            sx={{ ml: 1, flex: 1 }}
            placeholder='Buscar usuario'
            inputProps={{ 'aria-label': 'Buscar cliente' }}
            value={search}
          />
          <IconButton
            type='button'
            sx={{ p: '10px' }}
            aria-label='search'
            // onClick={updateList}
          >
            {usersQuery.isPending ? (
              <CircularProgress size={20} />
            ) : (
              <SearchIcon />
            )}
          </IconButton>
        </Paper>
      </DialogContent>
      <Scrollbar height='300px'>
        <List>
          {usersQuery.data?.users.map((user) => (
            <ListItem key={user.id}>
              <ListItemText
                primary={user.person.firstName + ' ' + user.person.lastName}
                primaryTypographyProps={{ variant: 'h5' }}
                secondary={user.person.email}
              />
              <ListItemSecondaryAction>
                {value && value.id === user.id ? (
                  <IconButton size='small' onClick={() => handleChange(user)}>
                    <Done color='primary' />
                  </IconButton>
                ) : (
                  <IconButton size='small' onClick={() => handleChange(user)}>
                    <Add />
                  </IconButton>
                )}
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Scrollbar>
    </Dialog>
  );
};
