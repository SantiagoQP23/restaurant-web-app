import { TypeIdentification } from '../../../../../models/common.model';
import { IClient, ICreateClient } from '../../../../../models/client.model';
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
  Typography,
  DialogTitle,
  Dialog,
  DialogContent,
  Stack,
  Box,
  IconButton,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { ArrowBack, CloseOutlined } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { CreateClientDto } from '../../dto/create-client.dto';
import { TitlePage } from '../../../components/TitlePage.component';
import { useCreateCliente } from '../../hooks/useClients';
import NiceModal, {
  muiDialogV5,
  useModal as useNiceModal
} from '@ebay/nice-modal-react';

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

export interface AddClientModalProps {
  onClientCreated?: (client: IClient) => void;
}

export const AddClientModal = NiceModal.create<AddClientModalProps>(
  ({ onClientCreated }) => {
    const client = initialClient;

    const { loading, callEndpoint } = useFetchAndLoad();

    const { mutateAsync, isPending } = useCreateCliente();

    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();

    const navigate = useNavigate();

    const modal = useNiceModal();
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

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
        // navigate('/clients');
        onClientCreated && onClientCreated(data);
        modal.hide();
      });
    }

    return (
      <>
        <Dialog {...muiDialogV5(modal)} fullScreen={fullScreen} maxWidth='sm'>
          <DialogTitle>
            <Stack
              direction='row'
              justifyContent='space-between'
              alignItems='center'
            >
              <Box>
                <Typography variant='h4'>Crear cliente</Typography>
              </Box>
              <Stack direction='row' spacing={2} alignItems='center'>
                <IconButton onClick={modal.hide} size='small'>
                  <CloseOutlined fontSize='small' />
                </IconButton>
              </Stack>
            </Stack>
          </DialogTitle>

          <DialogContent>
            <FormClient
              onSubmit={onSubmit}
              client={client}
              loading={isPending}
            />
          </DialogContent>
        </Dialog>
      </>
    );
  }
);
