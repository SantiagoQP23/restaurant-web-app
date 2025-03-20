import { FC, ReactNode } from 'react';
import { Box, useTheme, CssBaseline } from '@mui/material';
import { Outlet } from 'react-router-dom';

import Sidebar from './Sidebar/Sidebar.component';
import Header from './Header/Header.component';

interface SidebarLayoutProps {
  children?: ReactNode;
  allowedRoles?: string[];
}

const SidebarLayout: FC<SidebarLayoutProps> = () => {
  const theme = useTheme();

  return (
    <>
      <Box
        sx={{
          display: 'flex'
        }}
      >
        <CssBaseline />
        <Header />
        <Sidebar />
        <Box
          sx={{
            position: 'relative',
            zIndex: 5,
            display: 'block',
            flex: 1,
            width: '100%',
            pt: `${theme.header.height}`
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </>
  );
};

export default SidebarLayout;
