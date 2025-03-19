import {
  IconButton,
  InputBase,
  Paper,
  Grid,
  Button,
  CircularProgress,
  Typography
} from '@mui/material';
import { useState } from 'react';

import SearchIcon from '@mui/icons-material/Search';
import { ClientsTable } from './ClientsTable.component';

import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { resetActiveClient } from '../../../../../redux/slices/clients';
import { useFetchAndLoad } from '../../../../../hooks/useFetchAndLoad';
import { getClient } from '../../services';
import { IClient } from '../../../../../models';
import { useSnackbar } from 'notistack';
import { selectClients } from '../../../../../redux/slices/clients/clients.slice';
import { DeleteClient } from '../DeleteClient/DeleteClient.component';
import { useClient, useClients } from '../../hooks/useClients';
import { InputSearch } from '../../../../../components/ui';
import { TitlePage } from '../../../components/TitlePage.component';
import NiceModal from '@ebay/nice-modal-react';
import { AddClientModal } from '../AddClient/AddClientModal.component';

export const ClientsList = () => {
  const [identification, setIdentification] = useState<string>('');

  // const { clients } = useSelector(selectClients);

  const useClientQuery = useClient(identification, false);

  const { loading, callEndpoint } = useFetchAndLoad();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { enqueueSnackbar } = useSnackbar();

  const createClient = () => {
    dispatch(resetActiveClient());
    navigate('add');
  };

  const openCreateClientModal = () => {
    NiceModal.show(AddClientModal);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIdentification(event.target.value);
    // setClient(undefined);
  };

  const searchClient = async () => {
    if (identification.length === 0) {
      enqueueSnackbar('Ingrese un número de identificación', {
        variant: 'info'
      });
      return;
    }

    if (identification.length === 10 || identification.length === 13) {
      useClientQuery.refetch();
      // await callEndpoint(getClient(identification))
      //   .then((resp) => {
      //     const { data } = resp;

      //     setClient(data);
      //     console.log(data);
      //   })
      //   .catch((err) => {
      //     enqueueSnackbar('No se encontró al cliente', { variant: 'error' })

      //   })
    } else {
      enqueueSnackbar('El número de identificación es incorrecto', {
        variant: 'info'
      });
      return;
    }
  };

  return (
    <>
      <TitlePage
        title='Clientes'
        action={
          <Button
            sx={{ mt: { xs: 2, md: 0 } }}
            variant='contained'
            startIcon={<AddTwoToneIcon fontSize='small' />}
            onClick={createClient}
          >
            Añadir cliente
          </Button>
        }
      />
      <ClientsTable clientFound={useClientQuery.data} />

      <DeleteClient />
    </>
  );
};
