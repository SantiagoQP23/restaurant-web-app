import { Button, Stack } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { resetActiveUser } from '../../../../redux';

import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import { UsersTable } from '../components/UsersTable/UsersTable.component';
import { TitlePage } from '../../components/TitlePage.component';
import NiceModal from '@ebay/nice-modal-react';
import { InviteUserModal } from '../components/InviteUserModal.component';

export const UsersList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const createUser = () => {
    dispatch(resetActiveUser());
    navigate('add');
  };

  const openInviteUserModal = () => {
    NiceModal.show(InviteUserModal);
  };

  return (
    <>
      <TitlePage
        title='Usuarios'
        action={
          <Stack gap={2} direction='row' alignItems='center'>
            <Button
              sx={{ mt: { xs: 2, md: 0 } }}
              variant='contained'
              startIcon={<AddTwoToneIcon fontSize='small' />}
              onClick={openInviteUserModal}
            >
              Invitar usuario
            </Button>
            {/* <Button */}
            {/*   sx={{ mt: { xs: 2, md: 0 } }} */}
            {/*   variant='contained' */}
            {/*   startIcon={<AddTwoToneIcon fontSize='small' />} */}
            {/*   onClick={createUser} */}
            {/* > */}
            {/*   Añadir */}
            {/* </Button> */}
          </Stack>
        }
      />

      <UsersTable />
    </>
  );
};
