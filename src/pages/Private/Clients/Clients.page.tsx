import { Container } from '@mui/material';
import { Outlet } from 'react-router-dom';

const Clients = () => {
  return (
    <>
      <Container maxWidth='lg'>
        <Outlet />
      </Container>
    </>
  );
};
export default Clients;
