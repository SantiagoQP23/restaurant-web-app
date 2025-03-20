import { Button, Stack } from '@mui/material';

import AddIcon from '@mui/icons-material/Add';

import { TitlePage } from '../../../components';
import { CategoriesList } from './components';
import NiceModal from '@ebay/nice-modal-react';
import { ModalCreateCategory } from './components/ModalCreateCategory.component';

export const Categories = () => {
  const showModalCreateCategory = () => {
    NiceModal.show(ModalCreateCategory);
  };

  return (
    <>
      <TitlePage
        title='Categorias'
        action={
          <>
            <Stack direction='row' spacing={1}>
              <Button
                variant='contained'
                startIcon={<AddIcon />}
                onClick={showModalCreateCategory}
              >
                Añadir
              </Button>
            </Stack>
          </>
        }
      />
      <CategoriesList />
    </>
  );
};
