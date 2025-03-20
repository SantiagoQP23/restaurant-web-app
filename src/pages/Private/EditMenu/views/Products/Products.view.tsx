import { Button, Stack } from '@mui/material';
import { TitlePage } from '../../../components';
import { ProductsList } from './components/ProductsList.component';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';

export const Products = () => {
  const navigate = useNavigate();

  // Abrir el modal de editar
  const navigateToCreateProduct = () => {
    navigate('/menu/products/create');
  };

  return (
    <>
      <TitlePage
        title='Productos'
        action={
          <>
            <Stack direction='row' spacing={1}>
              <Button
                variant='contained'
                startIcon={<AddIcon />}
                onClick={navigateToCreateProduct}
              >
                Añadir
              </Button>
            </Stack>
          </>
        }
      />
      <ProductsList />
    </>
  );
};
