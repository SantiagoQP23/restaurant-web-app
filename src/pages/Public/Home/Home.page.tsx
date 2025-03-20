import { AppBar } from '../components/AppBar.component';
import { Container, Typography } from '@mui/material';
import { useRestaurantStore } from '../../Private/Common/store/restaurantStore';

export const Home = () => {
  const { restaurant } = useRestaurantStore();

  return (
    <>
      <AppBar />

      <Container maxWidth='lg'>
        <Typography variant='h3'>Restaurante {restaurant?.name}</Typography>
        {/* <>
        {getComponent(view)}
        </> */}
      </Container>
    </>
  );
};
