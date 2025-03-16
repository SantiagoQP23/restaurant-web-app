import { Button, Stack } from '@mui/material';

import { TitlePage } from '../../../components';

import NiceModal from '@ebay/nice-modal-react';

import AddIcon from '@mui/icons-material/Add';

import { SectionsList } from './components/SectionsList.component';
import { ModalCreateSection } from './components/ModalCreateSection.component';

export const Sections = () => {
  const showModalCreateSection = () => {
    NiceModal.show(ModalCreateSection);
  };

  return (
    <>
      <TitlePage
        title='Secciones'
        action={
          <>
            <Stack direction='row' spacing={1}>
              <Button
                variant='contained'
                startIcon={<AddIcon />}
                onClick={showModalCreateSection}
              >
                Añadir
              </Button>
            </Stack>
          </>
        }
      />
      <SectionsList />
    </>
  );
};
