import NiceModal, { muiDialogV5, useModal } from '@ebay/nice-modal-react';

import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
  InputBase,
  InputLabel,
  List,
  ListItem,
  ListItemButton,
  ListItemSecondaryAction,
  ListItemText,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Stack,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material';

import { CloseOutlined } from '@mui/icons-material';
import { useUsersSuggestions } from '../hooks/useUsers';
import SearchIcon from '@mui/icons-material/Search';
import { useEffect, useState } from 'react';
import { IUser } from '@/models';
import { useRoles } from '../hooks/useRoles';
import { InviteUserDto } from '../dto/invite-user.dto';
import { useSendInvitation } from '../hooks/useInvitation';
import { LoadingButton } from '@mui/lab';
import { useSnackbar } from 'notistack';

export const InviteUserModal = NiceModal.create(() => {
  const modal = useModal();
  const useInviteUser = useSendInvitation();
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
  const [roleId, setRoleId] = useState<number>();

  const {
    usersQuery,
    search,
    debouncedSearch,

    handleChangeSearch
  } = useUsersSuggestions();

  const { rolesQuery } = useRoles();

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const { enqueueSnackbar } = useSnackbar();

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

  const handleChangeRole = (event: SelectChangeEvent<number>) => {
    console.log(event.target.value);
    setRoleId(event.target.value as number);
  };

  const onSubmit = async () => {
    if (!selectedUser || !roleId) {
      enqueueSnackbar('Seleccione un usuario y un rol', {
        variant: 'warning'
      });
      return;
    }
    const inviteUserDto: InviteUserDto = {
      userId: selectedUser?.id,
      roleId: roleId
    };

    useInviteUser.mutateAsync(inviteUserDto, {
      onSuccess: () => {
        closeModal();
      }
    });
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
            <Typography variant='h5'>Invitar usuario</Typography>
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
              {usersQuery.isPending ? (
                <CircularProgress size={20} />
              ) : (
                <SearchIcon />
              )}
            </IconButton>
          </Paper>
        )}
        {!selectedUser &&
          usersQuery.data?.users &&
          usersQuery.data.users.length > 0 && (
            <Box height={250} overflow='auto' mt={2} borderRadius='8px'>
              <List>
                {usersQuery.data?.users.map((user) => (
                  <ListItemButton
                    key={user.id}
                    onClick={() => selectUser(user)}
                  >
                    <ListItemText
                      primary={`${user.person.firstName} ${user.person.lastName}`}
                      secondary={user.username}
                    />
                  </ListItemButton>
                ))}
              </List>
            </Box>
          )}

        {selectedUser && (
          <Box>
            <List>
              <ListItem>
                <ListItemText
                  primary={`${selectedUser.person.firstName} ${selectedUser.person.lastName} (${selectedUser.username})`}
                  secondary={selectedUser.person.email}
                />
                <ListItemSecondaryAction>
                  <IconButton
                    onClick={() => setSelectedUser(null)}
                    size='small'
                  >
                    <CloseOutlined fontSize='small' />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            </List>
            <Box mx={3} mt={2}>
              <FormControl fullWidth>
                <InputLabel id='demo-simple-select-label'>Rol</InputLabel>
                <Select
                  labelId='demo-simple-select-label'
                  id='demo-simple-select'
                  value={roleId || ''}
                  label='Rol'
                  onChange={handleChangeRole}
                  required
                >
                  {rolesQuery.data?.map((role) => (
                    <MenuItem value={role.id} key={role.id}>
                      {role.description}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={closeModal} color='inherit'>
          Close
        </Button>
        <LoadingButton
          onClick={onSubmit}
          variant='contained'
          loading={useInviteUser.isPending}
        >
          Invitar usuario
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
});
