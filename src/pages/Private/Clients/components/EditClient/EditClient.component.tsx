import { useState } from 'react';

import {
  Grid,
  Typography,
  Card,
  CardContent,
  Stack,
  Box,
  Switch,
  CardHeader,
  Tabs,
  Tab
} from '@mui/material';

import { useNavigate } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import {
  selectClients,
  setActiveClient,
  updateClient
} from '../../../../../redux/slices/clients/clients.slice';
import { ICreateClient } from '../../../../../models/client.model';
import { useSnackbar } from 'notistack';
import {
  TypeIdentification,
  CreatePerson
} from '../../../../../models/common.model';
import { FormClient } from '../FormClient.component';
import { UpdateClientDto } from '../../dto/update-client.dto';
import { TitlePage } from '../../../components/TitlePage.component';
import { Label } from '../../../../../components/ui';
import { useUpdateClient } from '../../hooks/useClients';

enum ViewClient {
  INFO = 'info',
  HISTORY = 'history'
}

export const EditClient = () => {
  const navigate = useNavigate();
  const { activeClient } = useSelector(selectClients);

  if (!activeClient) {
    navigate('/clients');
  }

  const [view, setView] = useState<ViewClient>(ViewClient.INFO);

  const updateClientMutation = useUpdateClient();

  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  let client: ICreateClient;

  // Remove id from objects
  const { id, person, isActive, ...restClient } = activeClient!;

  let identification = {
    type: TypeIdentification.CEDULA,
    num: ''
  };

  if (person.identification) {
    const { id: identificationId, ...rest } = person.identification;
    identification = { ...rest };
  }

  const { id: personId, ...restPerson } = person;

  const personN: CreatePerson = { ...restPerson, identification };

  client = { ...personN, ...restClient };

  async function onSubmit(form: ICreateClient) {
    const { identification, ...dataClient } = form;

    if (form.address === '') delete dataClient.address;

    if (form.numPhone === '') delete dataClient.numPhone;

    if (form.email === '') delete dataClient.email;

    let clientUpdated: UpdateClientDto = {
      ...dataClient,
      id: activeClient!.id
    };

    if (
      (identification.type === TypeIdentification.CEDULA &&
        identification.num.length === 10) ||
      (identification.type === TypeIdentification.RUC &&
        identification.num.length === 13)
    ) {
      clientUpdated = {
        ...clientUpdated,
        typeIdentification: identification.type,
        numberIdentification: identification.num
      };
    }

    console.log({ clientUpdated });

    updateClientMutation.mutateAsync(clientUpdated).then((data) => {
      dispatch(updateClient(data));
    });
  }

  const submitChangeStatus = async () => {
    const updateClientDto: UpdateClientDto = {
      id: activeClient!.id,
      isActive: !activeClient!.isActive
    };

    updateClientMutation.mutateAsync(updateClientDto).then((data) => {
      dispatch(updateClient(data));
      dispatch(setActiveClient(data));
    });
  };

  return (
    <>
      <TitlePage title={`Editar cliente`} />

      <Grid container spacing={2}>
        <Grid item xs={12} lg={4}>
          <Card>
            <CardHeader
              action={
                <>
                  <Label color={activeClient!.isActive ? 'success' : 'error'}>
                    {activeClient!.isActive ? 'Activo' : 'Inactivo'}
                  </Label>
                </>
              }
            />

            <CardContent>
              <Typography variant='h4' align='center' mt={5}>
                {activeClient!.person.firstName +
                  ' ' +
                  activeClient!.person.lastName}
              </Typography>

              <Typography variant='subtitle2' align='center' mb={5}>
                {activeClient!.person.email}
              </Typography>

              <Stack spacing={2}>
                <Box display='flex' justifyContent='space-between'>
                  <Box>
                    <Typography variant='h5'>Baneado</Typography>
                    <Typography variant='subtitle2'>
                      Deshabilitar cuenta
                    </Typography>
                  </Box>

                  <Switch
                    checked={!activeClient!.isActive}
                    color='success'
                    onChange={() => submitChangeStatus()}
                  />
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} lg={8}>
          <Stack spacing={1}>
            <Tabs value={view} onChange={(e, value) => setView(value)}>
              <Tab label='Información' value={ViewClient.INFO} />
              {/* <Tab label="Historial de pedidos" value={ViewClient.HISTORY} /> */}
            </Tabs>

            {view === ViewClient.INFO ? (
              <Card>
                <CardContent>
                  <FormClient
                    onSubmit={onSubmit}
                    client={client}
                    loading={updateClientMutation.isPending}
                    msg={'Editar'}
                  />
                </CardContent>
              </Card>
            ) : (
              <>Historial de pedidos</>
            )}
          </Stack>
        </Grid>
      </Grid>
    </>
  );
};
