import { useContext, useRef, useState } from 'react';

import {
  Avatar,
  Box,
  Button,
  Divider,
  lighten,
  List,
  ListItemText,
  Popover,
  Typography,
  ListItemButton,
  ListItemSecondaryAction,
  Badge
} from '@mui/material';

import { styled } from '@mui/material';

import { NavLink } from 'react-router-dom';

import LockOpenTwoToneIcon from '@mui/icons-material/LockOpenTwoTone';
import { startLogout, selectAuth } from '../../../../../../redux/slices/auth';
import { useAppDispatch, useAppSelector } from '../../../../../../hooks';
import { Roles } from '../../../../../../models/auth.model';
import { Circle } from '@mui/icons-material';
import { SocketContext } from '../../../../../../context/SocketContext';
import { Label } from '../../../../../../components/ui';
import { ValidRoles } from '../../../../Common/models/valid-roles.model';

// background: ${grey[900]};

const MenuUserBox = styled(Box)(
  ({ theme }) => `
        padding: ${theme.spacing(2)};
`
);

const UserBoxText = styled(Box)(
  ({ theme }) => `
        text-align: left;
        padding-left: ${theme.spacing(1)};
`
);

const UserBoxLabel = styled(Typography)(
  ({ theme }) => `
        font-weight: ${theme.typography.fontWeightBold};
        color: ${theme.palette.secondary.main};
        display: block;
`
);

const UserBoxDescription = styled(Typography)(
  ({ theme }) => `
        color: ${lighten(theme.palette.secondary.main, 0.5)}
`
);

export const Userbox = () => {
  const { user: userState } = useAppSelector(selectAuth);
  const dispatch = useAppDispatch();

  const { online } = useContext(SocketContext);

  const user = {
    name: userState?.username!,
    avatar: '/static/images/avatars/2.jpg',
    jobtitle: userState?.role?.description
  };

  const ref = useRef<any>(null);
  const [isOpen, setOpen] = useState<boolean>(false);

  const handleOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  const handleLogout = () => {
    dispatch(startLogout());
  };

  return (
    <>
      <Badge
        overlap='circular'
        color={online ? 'success' : 'error'}
        variant='dot'
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        badgeContent={''}
        sx={{
          cursor: 'pointer'
        }}
        // component={Button}
      >
        <Avatar
          variant='circular'
          alt={user.name}
          ref={ref}
          onClick={handleOpen}
        >
          {user.name.at(0)}
        </Avatar>
      </Badge>
      {/* <UserBoxButton color="secondary" >
        </UserBoxButton> */}

      {/* <UserBoxText>

          <UserBoxLabel variant="body1">  {user.name} </UserBoxLabel>
          <UserBoxDescription variant="body2">
            <Circle sx={{ fontSize: 10 }} color={online ? 'success' : 'error'} />
            {online ? ' En línea' : ' Desconectado'}
          </UserBoxDescription>
        </UserBoxText> */}

      {/* <ExpandMoreTwoToneIcon sx={{ ml: 1 }} /> */}

      <Popover
        anchorEl={ref.current}
        onClose={handleClose}
        open={isOpen}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
      >
        <MenuUserBox sx={{ minWidth: 210 }} display='flex'>
          {/* <Avatar variant="rounded" alt={user.name} src={user.avatar} /> */}
          <UserBoxText>
            <UserBoxLabel variant='body1'>
              {user.name}{' '}
              <Circle
                sx={{ fontSize: 10 }}
                color={online ? 'success' : 'error'}
              />
            </UserBoxLabel>
            <UserBoxDescription variant='body2'>
              {user.jobtitle}
            </UserBoxDescription>
          </UserBoxText>
        </MenuUserBox>
        <Divider sx={{ mb: 0 }} />
        <List sx={{ p: 1 }} component='nav'>
          <ListItemButton
            to='/users/profile'
            component={NavLink}
            onClick={handleClose}
          >
            <ListItemText primary='Mi perfil' />
            <ListItemSecondaryAction>
              <Label color='info'>Nuevo</Label>
            </ListItemSecondaryAction>
          </ListItemButton>

          <ListItemButton
            to='/users/account'
            component={NavLink}
            onClick={handleClose}
          >
            {/* <ListItemIcon>
                <AccountBoxTwoToneIcon fontSize="small" />

              </ListItemIcon> */}
            <ListItemText primary='Mi cuenta' />
            <ListItemSecondaryAction>
              {/* <Label color="info">Nuevo</Label> */}
            </ListItemSecondaryAction>
          </ListItemButton>

          {/* <ListItemButton onClick={() => !online && conectarSocket()}>
            <ListItemText primary={online ? "Conectado" : "Conectar"} />
      
          </ListItemButton> */}

          {/* <ButtonTheme /> */}

          {/* 
          <ListItem
            button
            to="/dashboards/messenger"
            comionent={NavLink}
          >
            <InboxTwoToneIcon fontSize="small" />
            <ListItemText primary="Messenger" />
          </ListItem>
        */}
          {/* <ListItem
            
            to="/management/profile/settings"
            component={NavLink}
           
          >
            <AccountTreeTwoToneIcon fontSize="small" />
            <ListItemText primary="Ver perfil" />
          </ListItem>  */}
        </List>
        <Divider />
        <Box sx={{ m: 1 }}>
          <Button color='primary' fullWidth onClick={() => handleLogout()}>
            <LockOpenTwoToneIcon sx={{ mr: 1 }} />
            Cerrar sesión
          </Button>
        </Box>
      </Popover>
    </>
  );
};

export default Userbox;
