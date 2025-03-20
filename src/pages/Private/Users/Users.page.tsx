import { FC } from 'react';

import { Container } from '@mui/material';
import { Outlet } from 'react-router-dom';

const Users: FC = () => {
  return (
    <div>
      <Container maxWidth='lg'>
        <Outlet />
      </Container>
    </div>
  );
};

export default Users;
