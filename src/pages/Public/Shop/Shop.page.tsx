import { AppBar } from '../components/AppBar.component';
import { Outlet } from 'react-router-dom';

import { Container } from '@mui/material';

export const Shop = () => {
  return (
    <>
      <AppBar />
      <Container maxWidth='lg'>
        <Outlet />
      </Container>
    </>
  );
};
