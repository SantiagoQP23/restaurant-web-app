import { TypeIdentification } from '../../../../../models/common.model';
import { ICreateClient } from '../../../../../models/client.model';
import { useFetchAndLoad } from '../../../../../hooks/useFetchAndLoad';
import { createClient } from '../../services';
import { addClient } from '../../../../../redux/slices/clients';
import { useDispatch } from 'react-redux';
import { useSnackbar } from 'notistack';
import { FormClient } from '../FormClient.component';
import {
  Container,
  Card,
  CardContent,
  Button,
  Grid,
  Typography
} from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { CreateClientDto } from '../../dto/create-client.dto';
import { TitlePage } from '../../../components/TitlePage.component';
import { useCreateCliente } from '../../hooks/useClients';

const initialClient: ICreateClient = {
  lastName: '',
  firstName: '',
  identification: {
    type: TypeIdentification.CEDULA,
    num: ''
  },
  numPhone: '',
  address: '',
  email: ''
};

export const AddClient = () => {
  const client = initialClient;

  const { loading, callEndpoint } = useFetchAndLoad();

  const { mutateAsync, isPending } = useCreateCliente();

  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const navigate = useNavigate();

  async function onSubmit(form: ICreateClient) {
    const { identification, ...dataClient } = form;

    if (form.address === '') delete dataClient.address;

    if (form.numPhone === '') delete dataClient.numPhone;

    if (form.email === '') delete dataClient.email;

    let newClient: CreateClientDto = {
      ...dataClient
    };

    if (
      (identification.type === TypeIdentification.CEDULA &&
        identification.num.length === 10) ||
      (identification.type === TypeIdentification.RUC &&
        identification.num.length === 13)
    ) {
      newClient = {
        ...newClient,
        typeIdentification: identification.type,
        numberIdentification: identification.num
      };
    }

    mutateAsync(newClient).then((data) => {
      dispatch(addClient(data));
      navigate('/clients');
    });
  }

  return (
    <>
      <TitlePage title='Nuevo cliente' />

      <Container maxWidth={'sm'}>
        <Card>
          <CardContent>
            <FormClient
              onSubmit={onSubmit}
              client={client}
              loading={isPending}
            />
          </CardContent>
        </Card>
      </Container>
    </>
  );
};
