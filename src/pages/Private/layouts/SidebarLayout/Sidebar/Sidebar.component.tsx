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

import {
  ChevronLeft,
  DoneOutlineRounded,
  ExpandMore,
  Inbox
} from '@mui/icons-material';

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

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen
  }),
  overflowX: 'hidden'
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`
  }
});

const DrawerPersistent = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open'
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  // boxSizing: "border-box",
  borderRight: `3px dashed #fff !important`,
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme)
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme)
  })
}));

const Title = ({ open }: { open: boolean }) => {
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
          mx: open ? 3 : 0.75
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

export const BoxUser = ({ onClick }: { onClick: () => void }) => {
  const theme = useTheme();

  const { user } = useSelector(selectAuth);

  return (
    <Box
      color='inherit'
      onClick={onClick}
      sx={{
        mx: 1,
        borderRadius: 1,
        border: '1px solid',
        padding: 1,
        borderColor: theme.colors.alpha.trueWhite[10],
        color: theme.colors.alpha.trueWhite[70],
        '&:hover': {
          borderColor: theme.colors.alpha.trueWhite[50],
          color: theme.colors.alpha.trueWhite[50],
          cursor: 'pointer'
        }
      }}
    >
      <Typography variant='h6' textAlign='center'>
        {user!.person.firstName} {user!.person.lastName}
      </Typography>
      <Typography variant='body1' textAlign='center'>
        {user!.role.name}
      </Typography>
    </Box>
  );
};

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  height: theme.header.height,
  // necessary for content to be below app bar
  ...theme.mixins.toolbar
}));

const drawerWidth = 300;

function Sidebar() {
  const {
    sidebarToggle,

    closeSidebar,
    open,
    handleDrawerClose
  } = useContext(SidebarContext);

  const theme = useTheme();

  return (
    <>
      <DrawerPersistent
        variant='permanent'
        sx={{
          display: {
            xs: 'none',
            lg: 'inline-block'
          }
        }}
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose} disabled>
            <ChevronLeft />
          </IconButton>
        </DrawerHeader>
        <Scrollbar height={'100%'}>
          <Box my={1}>
            <Title open={open} />
          </Box>

          <SidebarMenu />
        </Scrollbar>
        <Divider
          sx={{
            background: theme.colors.alpha.trueWhite[10]
          }}
        />

        {open && (
          <Box p={2} textAlign='center'>
            <Typography variant='subtitle2'>Desarrollado por </Typography>
            <Typography variant='body1'>Santiago Quirumbay</Typography>
          </Box>
        )}
      </DrawerPersistent>

      {/* </SidebarWrapper> */}
      <Drawer
        sx={{
          // boxShadow: `${theme.sidebar.boxShadow}`,
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
              <Title open={open} />
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
