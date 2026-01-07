import { Box } from '@mui/material';
import HeaderNotifications from './Notifications';
import { ButtonTheme, ButtonSound } from '../../components/';
import { SocketConnectionButton } from './SocketConnectionButton/SocketConnectionButton.component';
import { selectAuth } from '../../../../../../redux';
import { useSelector } from 'react-redux';

function HeaderButtons() {
  const { user } = useSelector(selectAuth);

  return (
    <Box sx={{}}>
      {/* <HeaderSearch /> */}
      <Box sx={{ display: 'flex', gap: 1 }} component='span'>
        <ButtonTheme />

        <ButtonSound />

        <SocketConnectionButton />

        <HeaderNotifications />

        {/* {user?.role.name === ValidRoles.admin && <CashRegisterPopover />} */}
      </Box>
    </Box>
  );
}

export default HeaderButtons;
