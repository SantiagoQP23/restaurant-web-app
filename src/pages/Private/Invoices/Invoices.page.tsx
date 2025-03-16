import { Container } from '@mui/material';
import { Outlet } from 'react-router-dom';

const Invoices = () => {
  return (
    <Container maxWidth='lg'>
      <Outlet />
    </Container>
  );
};
export default Invoices;
