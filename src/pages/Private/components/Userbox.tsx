import { useRef, useState } from 'react';

import {
  Box,
  Button,
  Divider,
  Hidden,
  lighten,
  List,
  ListItem,
  ListItemText,
  Popover,
  Typography
} from '@mui/material';

import { styled } from '@mui/material';

import { NavLink } from 'react-router-dom';

import InboxTwoToneIcon from '@mui/icons-material/InboxTwoTone';
import ExpandMoreTwoToneIcon from '@mui/icons-material/ExpandMoreTwoTone';
import AccountBoxTwoToneIcon from '@mui/icons-material/AccountBoxTwoTone';
import LockOpenTwoToneIcon from '@mui/icons-material/LockOpenTwoTone';
import AccountTreeTwoToneIcon from '@mui/icons-material/AccountTreeTwoTone';
import { startLogout } from '../../../redux/slices/auth/auth.thunks';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { selectAuth } from '../../../redux/slices/auth/auth.slice';

const UserBoxButton = styled(Button)(
  ({ theme }) => `
        padding-left: ${theme.spacing(1)};
        padding-right: ${theme.spacing(1)};
`
);

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

  // const user = {
  //   name: userState?.username,
  //   avatar: '/static/images/avatars/3.jpg',
  //   jobtitle: 'TODO'
  // };
  //
  console.log('userState', userState);

  const user = {
    name: userState?.username,
    avatar: '/static/images/avatars/3.jpg',
    jobtitle: 'TODO'
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
      <UserBoxButton color='secondary' ref={ref} onClick={handleOpen}>
        {/* <Avatar variant="rounded" alt={user.name} src={user.avatar} /> */}
        <Hidden mdDown>
          <UserBoxText>
            <UserBoxLabel variant='body1'>{user.name}</UserBoxLabel>
            <UserBoxDescription variant='body2'>
              {user.jobtitle}
            </UserBoxDescription>
          </UserBoxText>
        </Hidden>
        <Hidden smDown>
          <ExpandMoreTwoToneIcon sx={{ ml: 1 }} />
        </Hidden>
      </UserBoxButton>
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
            <UserBoxLabel variant='body1'>{user.name}</UserBoxLabel>
            <UserBoxDescription variant='body2'>
              {user.jobtitle}
            </UserBoxDescription>
          </UserBoxText>
        </MenuUserBox>
        <Divider sx={{ mb: 0 }} />
        <List sx={{ p: 1 }} component='nav'>
          <ListItem button to='/user/profile' component={NavLink}>
            <AccountBoxTwoToneIcon fontSize='small' />
            <ListItemText primary='My Profile' />
          </ListItem>
          <ListItem button to='/dashboards/messenger' component={NavLink}>
            <InboxTwoToneIcon fontSize='small' />
            <ListItemText primary='Messenger' />
          </ListItem>
          <ListItem
            button
            to='/management/profile/settings'
            component={NavLink}
          >
            <AccountTreeTwoToneIcon fontSize='small' />
            <ListItemText primary='Account Settings' />
          </ListItem>
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
