import { useContext } from 'react';

import {
  Box,
  alpha,
  Stack,
  lighten,
  Divider,
  IconButton,
  Tooltip,
  styled,
  useTheme
} from '@mui/material';

import MenuTwoToneIcon from '@mui/icons-material/MenuTwoTone';
import { SidebarContext } from '../../../Common/contexts/SidebarContext';
import CloseTwoToneIcon from '@mui/icons-material/CloseTwoTone';

import HeaderButtons from './Buttons';
import HeaderUserbox from './components/Userbox.component';
import HeaderMenu from './components/Menu.component';
import { Typography } from '@mui/material';

import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';

const drawerWidth = 300;

// background-color: ${alpha(theme.header.background, 0.95)};
const HeaderWrapper = styled(Box)(
  ({ theme }) => `
        height: ${theme.header.height};
        color: ${theme.header.textColor};
        padding: ${theme.spacing(0, 2)};
        right: 0;
        z-index: 1;
        backdrop-filter: blur(3px);
        position: fixed;
        justify-content: space-between;
        width: 100%;
        @media (min-width: ${theme.breakpoints.values.lg}px) {
            left: ${theme.sidebar.width};
            width: auto;
        }
`
);

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

  return (
    <AppBar position='fixed' open={false}>
      <Box
        display='flex'
        alignItems='center'
        justifyContent='space-between'
        mt={1}
      >
        {/* <HeaderMenu /> */}
        <Typography
          ml={{ xs: 3, lg: '310px' }}
          variant='h4'
          color='text.primary'
        >
          {/* QuiEats */}
        </Typography>

        <Stack direction='row' spacing={1} alignItems='center'>
          <HeaderButtons />
          <HeaderUserbox />
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
    </AppBar>
  );
}

{
  /* // </HeaderWrapper> */
}
export default Header;
