import { useContext } from 'react';

import {
  Box,
  Stack,
  IconButton,
  Tooltip,
  styled,
  Container
} from '@mui/material';

import MenuTwoToneIcon from '@mui/icons-material/MenuTwoTone';
import { SidebarContext } from '../../../Common/contexts/SidebarContext';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

import HeaderButtons from './Buttons';
import HeaderUserbox from './components/Userbox.component';
import { Typography } from '@mui/material';

import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import { useAppSelector } from '@/hooks';
import { selectAuth } from '@/redux';

const drawerWidth = 300;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open'
})<AppBarProps>(({ theme, open }) => ({
  zIndex: 1000,
  boxShadow: 'none',
  backdropFilter: 'blur(5px)',
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  backgroundColor: 'transparent',
  border: 'none',
  height: theme.header.height,
  // Desktop only: add margin when sidebar is open
  [theme.breakpoints.up('lg')]: {
    marginLeft: open ? drawerWidth : 0,
    width: open ? `calc(100% - ${drawerWidth}px)` : '100%',
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: open
        ? theme.transitions.duration.enteringScreen
        : theme.transitions.duration.leavingScreen
    })
  }
}));

function Header() {
  const { sidebarToggle, toggleSidebar } = useContext(SidebarContext);

  const { user: userState } = useAppSelector(selectAuth);
  return (
    <AppBar position='fixed' open={sidebarToggle}>
      <Container maxWidth='lg'>
        <Box
          display='flex'
          alignItems='center'
          justifyContent='space-between'
          mt={1}
        >
          {/* LEFT SIDE - Toggle Menu Button */}
          <Tooltip arrow title='Toggle Menu'>
            <IconButton color='primary' onClick={toggleSidebar}>
              {sidebarToggle ? (
                <ChevronLeftIcon fontSize='small' />
              ) : (
                <MenuTwoToneIcon fontSize='small' />
              )}
            </IconButton>
          </Tooltip>

          {/* RIGHT SIDE - User Actions */}
          <Stack direction='row' spacing={1} alignItems='center'>
            <HeaderButtons />
            {userState && <HeaderUserbox />}
          </Stack>
        </Box>
      </Container>
    </AppBar>
  );
}

{
  /* // </HeaderWrapper> */
}
export default Header;
