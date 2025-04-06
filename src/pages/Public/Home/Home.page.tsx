import { AppBar } from '../components/AppBar.component';
import { Box, Container, Typography } from '@mui/material';
import { Footer } from '../components/Footer.component';

export const Home = () => {
  return (
    <>
      <AppBar />

      <Container maxWidth='lg'>
        <Box
          height='70vh'
          display='flex'
          flexDirection='column'
          justifyContent='center'
          alignItems='center'
        >
          <Typography variant='h3'>
            Your complete system for managing restaurants
          </Typography>
          <Typography variant='h6' marginTop={2}>
            Manage your restaurant with ease and efficiency
          </Typography>
        </Box>
        <Footer />
      </Container>
    </>
  );
};
