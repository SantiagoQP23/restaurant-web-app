import { useState, MouseEvent } from 'react';

import { NavLink as RouterLink, useNavigate } from 'react-router-dom';

import {
  Container,
  AppBar as MuiAppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Menu,
  MenuItem,
  IconButton,
  Tooltip,
  Stack,
  ListItemButton,
  ListItemText,
  ListItem
} from '@mui/material/';

import AdbIcon from '@mui/icons-material/Adb';
import MenuIcon from '@mui/icons-material/Menu';
import { ButtonTheme } from '../../Private/layouts/SidebarLayout/components';
import { useRestaurantStore } from '../../Private/Common/store/restaurantStore';

const pages = [
  {
    name: 'Inicio',
    path: '/'
  },
  { name: 'Productos', path: '/shop' },
  {
    name: 'Acerca de',
    path: '/about'
  },
  {
    name: 'Contacto',
    path: '/contact'
  }
];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

export const AppBar = () => {
  const navigate = useNavigate();

  const { restaurant } = useRestaurantStore();

  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <>
      <MuiAppBar
        position='static'
        sx={{ py: 2, backgroundColor: 'transparent' }}
      >
        <Container maxWidth='xl'>
          <Toolbar disableGutters>
            {/* Mobile */}
            <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
              <img
                src={restaurant?.logo}
                alt='logo'
                width='60px'
                style={{ borderRadius: 8 }}
              />
            </Box>
            {/* <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} /> */}
            <Typography
              variant='h5'
              noWrap
              component='a'
              href='#app-bar-with-responsive-menu'
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                textDecoration: 'none',
                color: 'text.primary'
              }}
            >
              {restaurant?.name}
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <ButtonTheme />

              <Button
                onClick={() => navigate('/auth/login')}
                size='small'
                sx={{ ml: 1 }}
              >
                Iniciar sesión
              </Button>

              <IconButton
                size='large'
                aria-label='account of current user'
                aria-controls='menu-appbar'
                aria-haspopup='true'
                onClick={handleOpenNavMenu}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id='menu-appbar'
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left'
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left'
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' }
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page.path} onClick={handleCloseNavMenu}>
                    <Typography textAlign='center'>{page.name}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>

            {/* Desktop */}

            <Box
              display='flex'
              alignItems='center'
              justifyContent={{ xs: 'space-between', md: 'flex-start' }}
              sx={{ display: { xs: 'none', md: 'flex' }, flexGrow: 1 }}
            >
              <Stack
                sx={{
                  display: { xs: 'none', md: 'flex' },
                  alignItems: 'center'
                }}
                direction='row'
                spacing={2}
                flexGrow={1}
              >
                <Box>
                  <img
                    src={restaurant?.logo}
                    alt='logo'
                    width='60px'
                    style={{ borderRadius: 8 }}
                  />
                </Box>
                <Typography
                  variant='h6'
                  noWrap
                  component='a'
                  href='#app-bar-with-responsive-menu'
                  sx={{
                    mr: 2,
                    fontWeight: 'bold',
                    color: 'text.primary',
                    textDecoration: 'none'
                  }}
                >
                  Restaurante {restaurant?.name}
                </Typography>
              </Stack>
              <Stack
                direction='row'
                spacing={2}
                alignItems='center'
                // sx={{ flexGrow: 1 }}
                flexGrow={1}
                justifyContent='center'
              >
                {pages.map((page) => (
                  <ListItem
                    key={page.path}
                    component={RouterLink}
                    onClick={handleCloseNavMenu}
                    to={page.path}
                    sx={{
                      minHeight: 48,
                      // justifyContent: open ? "initial" : "center",
                      px: 2.5,
                      '&.active': {
                        color: 'primary.main',
                        // bgcolor: "action.selected",
                        fontWeight: 'fontWeightBold'
                      },
                      textAlign: 'center',
                      color: 'secondary.main'
                    }}
                    end
                  >
                    <ListItemText
                      primary={page.name}
                      primaryTypographyProps={{
                        fontSize: 14,
                        fontWeight: 'bold'
                      }}
                      // sx={{ opacity: open ? 1 : 0 }}
                    />
                  </ListItem>
                ))}
              </Stack>
              <Stack
                direction='row'
                spacing={1}
                alignItems='center'
                flexGrow={1}
                justifyContent='right'
              >
                <ButtonTheme />

                <Box>
                  <Button
                    onClick={() => navigate('/auth/login')}
                    variant='contained'
                    size='small'
                  >
                    Iniciar sesión
                  </Button>
                </Box>
              </Stack>
            </Box>

            {/* <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <MenuIcon />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box> */}
          </Toolbar>
        </Container>
      </MuiAppBar>
    </>
  );
};
