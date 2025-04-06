import { ButtonTheme } from '@/pages/Private/layouts/SidebarLayout/components';
import { Stack, Typography } from '@mui/material';

export const Footer = () => {
  return (
    <Stack
      direction='row'
      justifyContent='right'
      alignItems='center'
      padding={2}
    >
      <Typography>Theme</Typography>
      <ButtonTheme />
    </Stack>
  );
};
