import NiceModal, { muiDialogV5, useModal } from '@ebay/nice-modal-react';

import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  InputBase,
  List,
  ListItem,
  ListItemButton,
  ListItemSecondaryAction,
  ListItemText,
  Paper,
  Stack,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { CloseOutlined } from '@mui/icons-material';
import { useUsers, useUsersSuggestions } from '../hooks/useUsers';
import SearchIcon from '@mui/icons-material/Search';
import { useEffect, useState } from 'react';
import { IUser } from '@/models';
export const InviteUserModal = NiceModal.create(() => {
  const modal = useModal();
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);

  const {
    usersQuery,
    search,
    debouncedSearch,

    handleChangeSearch
  } = useUsersSuggestions();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const closeModal = () => {
    modal.hide();
  };

  const updateList = () => {
    usersQuery.refetch();
  };

  useEffect(() => {
    updateList();
  }, [debouncedSearch]);

  const selectUser = (user: IUser) => {
    setSelectedUser(user);
  };

  return (
    <Dialog {...muiDialogV5(modal)} fullScreen={fullScreen} maxWidth='lg'>
      <DialogTitle>
        <Stack
          direction='row'
          justifyContent='space-between'
          alignItems='center'
        >
          <Box>
            <Typography variant='h4'>Invitar usuario</Typography>
          </Box>
          <Stack direction='row' spacing={2} alignItems='center'>
            <IconButton onClick={modal.hide} size='small'>
              <CloseOutlined fontSize='small' />
            </IconButton>
          </Stack>
        </Stack>
      </DialogTitle>
      <DialogContent sx={{ width: { lg: '500px' } }}>
        {!selectedUser && (
          <Paper
            component='form'
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center' }}
          >
            <InputBase
              type='text'
              onChange={handleChangeSearch}
              sx={{ ml: 1, flex: 1 }}
              placeholder='Buscar usuario'
              inputProps={{ 'aria-label': 'Buscar usuario' }}
              value={search}
            />
            <IconButton
              type='button'
              sx={{ p: '10px' }}
              aria-label='search'
              onClick={updateList}
            >
              {usersQuery.isLoading ? (
                <CircularProgress size={20} />
              ) : (
                <SearchIcon />
              )}
            </IconButton>
          </Paper>
        )}
        <List>
          {!selectedUser &&
            usersQuery.data?.users.map((user) => (
              <ListItemButton key={user.id} onClick={() => selectUser(user)}>
                <ListItemText
                  primary={`${user.person.firstName} ${user.person.lastName}`}
                  secondary={user.username}
                />
              </ListItemButton>
            ))}
          {selectedUser && (
            <ListItem>
              <ListItemText
                primary={`${selectedUser.person.firstName} ${selectedUser.person.lastName}`}
                secondary={selectedUser.username}
              />
              <ListItemSecondaryAction>
                <IconButton onClick={() => setSelectedUser(null)} size='small'>
                  <CloseOutlined fontSize='small' />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          )}
        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeModal} color='inherit'>
          Close
        </Button>
        <Button onClick={closeModal} variant='contained'>
          Invitar usuario
        </Button>
      </DialogActions>
    </Dialog>
  );
});
