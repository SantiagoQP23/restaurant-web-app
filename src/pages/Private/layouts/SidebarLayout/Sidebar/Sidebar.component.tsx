import { useContext, useRef, useState } from 'react';
import { SidebarContext } from '../../../Common/contexts/SidebarContext';

import {
  Box,
  Divider,
  Typography,
  IconButton,
  Drawer,
  Popover,
  Stack,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  List,
  ListSubheader
} from '@mui/material';

import MuiDrawer from '@mui/material/Drawer';

import SidebarMenu from './SidebarMenu/SidebarMenu.component';
import { Scrollbar } from '../../../components';

import { DoneOutlineRounded, ExpandMore, Inbox } from '@mui/icons-material';

import { useSelector } from 'react-redux';
import { selectAuth } from '../../../../../redux';

import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import { useRestaurantStore } from '../../../Common/store/restaurantStore';
import { Restaurant } from '@/pages/Private/Common/models/restaurant.model';
import { switchRestaurantMutation } from '@/pages/Private/Restaurant/hooks/useRestaurant';

const SidebarWrapper = styled(Box)(
  ({ theme }) => `
        width: ${theme.sidebar.width};
        min-width: ${theme.sidebar.width};
        color: ${theme.colors.alpha.trueWhite[70]};
        background: ${theme.sidebar.background};
        position: relative;
        z-index: 700;
        height: 100%;
        padding-bottom: 68px;
`
);

const drawerWidth = 300;

const DrawerPersistent = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open'
})<{ open?: boolean }>(({ theme, open }) => ({
  width: open ? drawerWidth : 0,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  '& .MuiDrawer-paper': {
    width: open ? drawerWidth : 0,
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: open
        ? theme.transitions.duration.enteringScreen
        : theme.transitions.duration.leavingScreen
    }),
    background: theme.sidebar.background,
    color: theme.colors.alpha.trueWhite[70],
    borderRight: 'none'
  }
}));

const Title = () => {
  const { restaurant, setRestaurant } = useRestaurantStore((state) => state);
  const switchRestaurant = switchRestaurantMutation();
  const { user } = useSelector(selectAuth);

  const ref = useRef<any>(null);
  const [isOpen, setOpen] = useState<boolean>(false);

  const handleOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  const changeRestaurant = (newRestaurant: Restaurant) => {
    if (restaurant?.id !== newRestaurant.id) {
      switchRestaurant.mutate(newRestaurant.id);
    }

    handleClose();
  };

  return (
    <>
      <Box
        display='flex'
        alignItems='center'
        gap={2}
        sx={{
          mx: 3
        }}
      >
        <Box display='flex' alignItems='center' gap={2}>
          {restaurant?.logo && (
            <img
              src={restaurant!.logo}
              alt='logo'
              width='60px'
              style={{ borderRadius: 8 }}
            />
          )}

          <Box>
            <Typography variant='h6' color='text.primary'>
              {restaurant?.name}
            </Typography>
            <Typography variant='subtitle2' color='text.primary'>
              Restaurante
            </Typography>
          </Box>
        </Box>
        <Box flexGrow={1} />
        <IconButton onClick={handleOpen} ref={ref}>
          <ExpandMore fontSize='small' />
        </IconButton>
      </Box>
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
        sx={{ p: 0 }}
      >
        <List
          sx={{ width: 250, maxWidth: 250 }}
          subheader={
            <ListSubheader
              component='div'
              id='nested-list-subheader'
              sx={{ fontSize: 12 }}
            >
              Restaurantes
            </ListSubheader>
          }
        >
          {user?.restaurantRoles.map((restaurantRole) => (
            <ListItemButton
              key={restaurantRole.id}
              onClick={() => changeRestaurant(restaurantRole.restaurant)}
            >
              <ListItemText
                primaryTypographyProps={{ variant: 'body1' }}
                secondaryTypographyProps={{ variant: 'subtitle2' }}
                primary={restaurantRole.restaurant.name}
                secondary={restaurantRole.role.description}
              />
              {restaurant?.id === restaurantRole.restaurant.id && (
                <ListItemIcon sx={{ minWidth: '30px' }}>
                  <DoneOutlineRounded fontSize='small' color='secondary' />
                </ListItemIcon>
              )}
            </ListItemButton>
          ))}
        </List>
      </Popover>
    </>
  );
};

function Sidebar() {
  const { sidebarToggle, closeSidebar } = useContext(SidebarContext);

  const theme = useTheme();

  return (
    <>
      {/* Desktop Permanent Drawer */}
      <DrawerPersistent
        variant='permanent'
        open={sidebarToggle}
        sx={{
          display: { xs: 'none', lg: 'block' }
        }}
      >
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          <Scrollbar height={'100%'}>
            <Box mx={2} my={1} mt={3}>
              <Title />
            </Box>

            <SidebarMenu />
          </Scrollbar>

          <Divider />
          <Box p={1} textAlign='center'>
            <Typography color='text.primary' variant='subtitle1'>
              Desarrollado por{' '}
            </Typography>
            <Typography variant='body1' color='text.primary'>
              Santiago Quirumbay
            </Typography>
          </Box>
        </Box>
      </DrawerPersistent>

      {/* Mobile/Tablet Temporary Drawer */}
      <Drawer
        sx={{
          display: { xs: 'block', lg: 'none' },
          zIndex: theme.zIndex.drawer + 3
        }}
        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
        open={sidebarToggle}
        onClose={closeSidebar}
        variant='temporary'
        elevation={10}
        color='inherit'
      >
        <SidebarWrapper>
          <Scrollbar height={'100%'}>
            <Box mx={2} my={1} mt={3}>
              <Title />
            </Box>

            <SidebarMenu />
          </Scrollbar>

          <Divider />
          <Box p={1} textAlign='center'>
            <Typography color='text.primary' variant='subtitle1'>
              Desarrollado por{' '}
            </Typography>
            <Typography variant='body1' color='text.primary'>
              Santiago Quirumbay
            </Typography>
          </Box>
        </SidebarWrapper>
      </Drawer>
    </>
  );
}

export default Sidebar;
