import { FC, useEffect, useState, useContext } from 'react';

import {
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton
} from '@mui/material';
import { Close } from '@mui/icons-material';

import { IClient, ICreateClient } from '../../../../../models';
import { OrderActionType, OrderContext } from '../../context/Order.context';
import { useSelector } from 'react-redux';
import { selectOrders } from '../../../../../redux/slices/orders/orders.slice';
import { statusModalClientOrder } from '../../services/sharing-information.service';

import {
  useClients,
  useCreateCliente
} from '../../../Clients/hooks/useClients';

import { FormClient } from '../../../Clients/components/FormClient.component';
import { TypeIdentification } from '../../../../../models/common.model';
import { CreateClientDto } from '../../../Clients/dto/create-client.dto';
import { useUpdateOrder } from '../../hooks';

interface Props {
  client?: IClient;
}

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

export const ModalClientOrder: FC<Props> = () => {
  const [open, setOpen] = useState<boolean>(false);

  const suscription$ = statusModalClientOrder.getSubject();

  const { clientsQuery, search } = useClients();

  const clientForm = initialClient;

  const { dispatch } = useContext(OrderContext);

  const { activeOrder } = useSelector(selectOrders);

  const handleClose = () => {
    setOpen(false);
  };

  const { mutate: updateOrder } = useUpdateOrder();

  const clientAddMutation = useCreateCliente();

  const onSubmit = (data: ICreateClient) => {
    const { identification, ...dataClient } = data;

    if (data.address === '') delete dataClient.address;

    if (data.numPhone === '') delete dataClient.numPhone;

    if (data.email === '') delete dataClient.email;

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

    clientAddMutation.mutateAsync(newClient).then((res) => {
      if (!activeOrder) {
        dispatch({ type: OrderActionType.SET_CLIENT, payload: res });
      } else {
        updateOrder({
          id: activeOrder.id,
          clientId: res.id
        });
      }

      handleClose();
    });
  };

  useEffect(() => {
    clientsQuery.refetch();
  }, [search]);

  useEffect(() => {
    const suscription = suscription$.subscribe(({ value }) => {
      console.log('abrir modal');
      setOpen(value);
    });

    return () => {
      dispatch({ type: OrderActionType.SET_CLIENT, payload: null });

      suscription.unsubscribe();
    };
  }, []);

  return (
    <>
      <Dialog open={open} onClose={handleClose} sx={{ width: 'auto' }}>
        <DialogTitle
          display='flex'
          justifyContent='space-between'
          alignItems='center'
        >
          <Typography variant='h4'>Nuevo cliente</Typography>
          <IconButton onClick={handleClose}>
            <Close />
          </IconButton>
        </DialogTitle>

        <DialogContent>
          {/* <FormNewClientBasic callback={handleClose} /> */}
          <FormClient
            client={clientForm}
            onSubmit={onSubmit}
            loading={clientAddMutation.isPending}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};
