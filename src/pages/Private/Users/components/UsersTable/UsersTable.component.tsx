import { FC, useState, useEffect } from 'react';

import {
  Box,
  Card,
  IconButton,
  LinearProgress,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip,
  Typography,
  FormControlLabel,
  TableSortLabel,
  Paper,
  InputBase,
  CircularProgress
} from '@mui/material';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import {
  resetActiveUser,
  selectUsers,
  setActiveUser
} from '../../../../../redux/slices/users/users.slice';
import { useSelector, useDispatch } from 'react-redux';
import { IUser, Roles } from '../../../../../models/auth.model';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/';
import { Label } from '../../../../../components/ui';
import { useUsers } from '../../hooks/useUsers';
import SearchIcon from '@mui/icons-material/Search';
import { selectAuth } from '../../../../../redux';
import { ValidRoles } from '../../../Common/models/valid-roles.model';
import { useRestaurantStore } from '@/pages/Private/Common/store/restaurantStore';
import NiceModal from '@ebay/nice-modal-react';
import { EditUserRole } from '../EditUserRole.component';
import { RemoveUserFromRestaurant } from '../RemoveUserFromRestaurant/RemoveUserFromRestaurant.component';

export const TableRowUser: FC<{ user: IUser }> = ({ user }) => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { user: currentUser } = useSelector(selectAuth);
  const restaurant = useRestaurantStore((state) => state.restaurant);

  const theme = useTheme();

  const openEditUserRoleModal = () => {
    NiceModal.show(EditUserRole, { user });
  };

  const openRemoveUserModal = () => {
    NiceModal.show(RemoveUserFromRestaurant, { user });
  };

  // const editUser = (user: IUser) => {
  //   dispatch(setActiveUser(user));
  //
  //   if (currentUser!.id === user.id) {
  //     navigate('/users/account');
  //   } else {
  //     // navigate(`edit/${user.id}`);
  //   }
  // };

  const userRole = user.restaurantRoles.find(
    (resRole) => resRole.restaurant.id === restaurant?.id
  )?.role;

  return (
    <TableRow>
      {/* <TableCell padding='checkbox'>
        <Switch
          checked={user.isActive}
          color={user.isActive ? 'success' : 'warning'}
          onChange={() => submitChangeStatus(user)}
        />

      </TableCell> */}
      <TableCell>
        <Typography
          variant='body1'
          fontWeight='bold'
          color='text.primary'
          gutterBottom
          noWrap
        >
          {user.person.lastName} {user.person.firstName}
        </Typography>
      </TableCell>

      {/* <TableCell> */}
      {/*   <Typography variant='body1' color='text.primary' gutterBottom noWrap> */}
      {/*     {user.person.identification?.num} */}
      {/*   </Typography> */}
      {/* </TableCell> */}
      <TableCell>
        <Typography variant='body1' color='text.primary' gutterBottom noWrap>
          {user.username}
        </Typography>
      </TableCell>
      <TableCell>
        <Typography variant='body1' color='text.primary' gutterBottom noWrap>
          {user.person.email}
        </Typography>
      </TableCell>
      <TableCell>
        <Typography variant='body1' color='text.primary' gutterBottom noWrap>
          {userRole ? userRole.description : 'N/A'}
          {/* <Label */}
          {/*   color={ */}
          {/*     user?.role.name === 'admin' */}
          {/*       ? 'info' */}
          {/*       : user?.role.name === 'mesero' */}
          {/*         ? 'primary' */}
          {/*         : 'secondary' */}
          {/*   } */}
          {/* > */}
          {/*   {Roles[`${user?.role.name! as ValidRoles}`]} */}
          {/* </Label> */}
        </Typography>
      </TableCell>

      <TableCell>
        <Typography variant='body1' color='text.primary' gutterBottom noWrap>
          <Label color={user.isActive ? 'success' : 'error'}>
            {user.isActive ? 'Activo' : 'Inactivo'}
          </Label>
        </Typography>
      </TableCell>

      <TableCell align='right'>
        {user.id !== currentUser?.id && (
          <>
            <Tooltip title='Edit role' arrow>
              <IconButton
                sx={{
                  '&:hover': {
                    background: theme.colors.primary.lighter
                  },
                  color: theme.palette.primary.main
                }}
                color='inherit'
                size='small'
                onClick={openEditUserRoleModal}
              >
                <EditTwoToneIcon fontSize='small' />
              </IconButton>
            </Tooltip>
            <Tooltip title='Remover del restaurante' arrow>
              <IconButton
                sx={{
                  '&:hover': { background: theme.colors.error.lighter },
                  color: theme.palette.error.main
                }}
                color='inherit'
                size='small'
                onClick={openRemoveUserModal}
              >
                <DeleteTwoToneIcon fontSize='small' />
              </IconButton>
            </Tooltip>
          </>
        )}
      </TableCell>
    </TableRow>
  );
};

interface Props {}

export const UsersTable: FC<Props> = ({}) => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const {
    usersQuery,
    page,
    search,
    rowsPerPage,

    handleChangeSearch,
    handleChangePage,
    handleChangeRowsPerPage
  } = useUsers();

  const { users } = useSelector(selectUsers);

  const [dense, setDense] = useState<boolean>(false);

  const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDense(event.target.checked);
  };

  const openEditUserRoleModal = () => {
    NiceModal.show(EditUserRole);
  };
  const editUser = (user: IUser) => {
    dispatch(setActiveUser(user));
    navigate('edit');
  };

  const createUser = () => {
    dispatch(resetActiveUser());
    navigate('add');
  };

  const updateList = () => {
    usersQuery.refetch();
  };

  useEffect(() => {
    updateList();
  }, [page, rowsPerPage, search]);

  return (
    <>
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

      <Box sx={{ height: 400, width: '100%', my: 1 }}>
        {usersQuery.isPending && <LinearProgress />}
        <Card>
          <TableContainer>
            <Table size={dense ? 'small' : 'medium'}>
              <TableHead>
                <TableRow>
                  {/* <TableCell padding="checkbox">
                  Estado
                </TableCell> */}
                  <TableCell>
                    <TableSortLabel>Nombres y apellidos</TableSortLabel>
                  </TableCell>
                  {/* <TableCell>Número de identificación</TableCell> */}
                  <TableCell>Nombre de usuario</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Rol</TableCell>
                  <TableCell>Estado</TableCell>
                  <TableCell>Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {/* {
                  user
                    ? <TableRowUser user={user} />
                    : users.length > 0 && users.map(user => (
                      <TableRowUser key={user.id} user={user} />
                    ))


                } */}
                {usersQuery.data &&
                  usersQuery.data.count > 0 &&
                  usersQuery.data.users.map((user) => (
                    <TableRowUser key={user.id} user={user} />
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Box p={2} display='flex' justifyContent='right'>
            {/* <FormControlLabel */}
            {/*   control={<Switch checked={dense} onChange={handleChangeDense} />} */}
            {/*   label='Dense padding' */}
            {/* /> */}
            <TablePagination
              component='div'
              count={usersQuery.data?.count || 0}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              page={page}
              rowsPerPage={rowsPerPage}
              rowsPerPageOptions={[5, 10, 25, 30]}
            />
          </Box>
        </Card>
      </Box>
    </>
  );
};
