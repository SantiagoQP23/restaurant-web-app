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
import CloseTwoToneIcon from '@mui/icons-material/CloseTwoTone';

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
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  })
}));

function Header() {
  const { sidebarToggle, toggleSidebar, open, handleDrawerOpen } =
    useContext(SidebarContext);

  const { user: userState } = useAppSelector(selectAuth);
  return (
    <AppBar position='fixed' open={false}>
      <Container maxWidth='lg'>
        <Box
          display='flex'
          alignItems='center'
          justifyContent='space-between'
          mt={1}
        >
          {/* <HeaderMenu /> */}
          <Typography
            // ml={{ xs: 3, lg: '310px' }}
            variant='h6'
            color='text.primary'
          ></Typography>

          <Stack direction='row' spacing={1} alignItems='center'>
            <HeaderButtons />
            {userState && <HeaderUserbox />}
            <Box
              component='span'
              sx={{
                display: { lg: 'none', xs: 'inline-block' }
              }}
            >
              <Tooltip arrow title='Toggle Menu'>
                <IconButton
                  color='primary'
                  onClick={() => {
                    toggleSidebar();
                    handleDrawerOpen();
                  }}
                >
                  {sidebarToggle ? (
                    <CloseTwoToneIcon fontSize='small' />
                  ) : (
                    <MenuTwoToneIcon fontSize='small' />
                  )}
                </IconButton>
              </Tooltip>
            </Box>
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
