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
import { useUpdateUser, useUsersSuggestions } from '../hooks/useUsers';
import SearchIcon from '@mui/icons-material/Search';
import { useEffect, useState } from 'react';
import { IUser } from '@/models';
import { useRoles } from '../hooks/useRoles';
import { InviteUserDto } from '../dto/invite-user.dto';
import { useSendInvitation } from '../hooks/useInvitation';
import { LoadingButton } from '@mui/lab';
import { EditUser } from './EditUser/EditUser.component';
import { useRestaurantStore } from '../../Common/store/restaurantStore';
import { useSnackbar } from 'notistack';

interface Props {
  user: IUser;
}

export const EditUserRole = NiceModal.create<Props>(({ user }) => {
  const modal = useModal();
  const updateUserRole = useUpdateUser().updateUserRole;
  const restaurant = useRestaurantStore((state) => state.restaurant);

  const userRole = user.restaurantRoles.find(
    (resRole) => resRole.restaurant.id === restaurant?.id
  )?.role;

  const [roleId, setRoleId] = useState<number>(userRole!.id);

  const {
    usersQuery,
    search,
    debouncedSearch,

    handleChangeSearch
  } = useUsersSuggestions();

  const { rolesQuery } = useRoles();
  const { enqueueSnackbar } = useSnackbar();

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const closeModal = () => {
    modal.hide();
  };

  const updateList = () => {
    usersQuery.refetch();
  };

  useEffect(() => {
    updateList();
  }, [debouncedSearch]);

  const handleChangeRole = (event: SelectChangeEvent<number>) => {
    console.log(event.target.value);
    setRoleId(event.target.value as number);
  };

  const onSubmit = async () => {
    console.log({ roleId });
    if (!roleId) {
      enqueueSnackbar('Seleccione un rol', { variant: 'warning' });
    }

    updateUserRole.mutateAsync(
      {
        userId: user.id,
        roleId: roleId!
      },
      {
        onSuccess: () => {
          updateList();
          closeModal();
        }
      }
    );
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
            <Typography variant='h5'>Actualizar rol</Typography>
          </Box>
          <Stack direction='row' spacing={2} alignItems='center'>
            <IconButton onClick={modal.hide} size='small'>
              <CloseOutlined fontSize='small' />
            </IconButton>
          </Stack>
        </Stack>
      </DialogTitle>
      <DialogContent sx={{ width: { lg: '500px' } }}>
        <Box
          my={2}
          display='flex'
          alignItems='center'
          justifyContent='space-between'
          gap={2}
        >
          <Box>
            <Typography variant='h6'>
              {user.person.firstName} {user.person.lastName}
            </Typography>
            <Typography variant='body2'>{user.person.email}</Typography>
          </Box>

          <FormControl>
            <InputLabel id='demo-simple-select-label'>Rol</InputLabel>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              size='small'
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
      </DialogContent>
      <DialogActions>
        <Button onClick={closeModal} color='inherit'>
          Close
        </Button>
        <LoadingButton
          onClick={onSubmit}
          variant='contained'
          loading={updateUserRole.isPending}
        >
          Actualizar
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
});
