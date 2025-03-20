import { useState } from 'react';

import { Box, Tab, Tabs } from '@mui/material';
import { TitlePage } from '../../../components/TitlePage.component';
import { FormChangePassword } from './components/FormChangePassword.component';
import { FormGeneral } from './components/FormGeneral.component';

enum TabStatus {
  general = 'general',
  changePassword = 'changePassword'
}

export const Account = () => {
  const [tab, setTab] = useState(TabStatus.general);

  return (
    <>
      <TitlePage title='Cuenta' />

      <Tabs value={tab} onChange={(e, value) => setTab(value)}>
        <Tab value={TabStatus.general} label='General' />
        <Tab value={TabStatus.changePassword} label='Cambiar contraseña' />
      </Tabs>

      <Box mt={2}>
        {tab === TabStatus.general && <FormGeneral />}

        {tab === TabStatus.changePassword && <FormChangePassword />}
      </Box>
    </>
  );
};
