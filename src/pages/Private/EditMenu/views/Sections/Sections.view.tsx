import { Button, Stack } from '@mui/material';

import { TitlePage } from '../../../components';

import NiceModal from '@ebay/nice-modal-react';

import AddIcon from '@mui/icons-material/Add';
import UploadFileIcon from '@mui/icons-material/UploadFile';

import { SectionsList } from './components/SectionsList.component';
import { ModalCreateSection } from './components/ModalCreateSection.component';
import { ModalUploadExcel } from './components/ModalUploadExcel.component';

export const Sections = () => {
  const showModalCreateSection = () => {
    NiceModal.show(ModalCreateSection);
  };

  const showModalUploadExcel = () => {
    NiceModal.show(ModalUploadExcel);
  };

  return (
    <>
      <TitlePage
        title='Secciones'
        action={
          <>
            <Stack direction='row' spacing={1}>
              <Button
                variant='outlined'
                startIcon={<UploadFileIcon />}
                onClick={showModalUploadExcel}
              >
                Importar
              </Button>
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
