import { Container } from '@mui/material';
import { Outlet } from 'react-router-dom';

const Table = () => {
  return (
    <>
      <Container maxWidth='lg'>
        <Outlet />
      </Container>
    </>
  );
};
export default Table;
