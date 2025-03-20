import { Outlet } from 'react-router-dom';

import { Container } from '@mui/material';
import { useCashRegisterActive } from './hooks/useCashRegister';

const Balance = () => {
  useCashRegisterActive();

  return (
    <>
      <Container maxWidth='lg'>
        <Outlet />
      </Container>
    </>
  );
};

export default Balance;
