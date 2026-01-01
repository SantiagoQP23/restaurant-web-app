import { Box, Typography, Button } from '@mui/material';
import { useClient } from '../../../../Clients/hooks/useClients';
import { IClient } from '../../../../../../models';
import { FC } from 'react';

interface Props {
  setClient: (client: IClient | null) => void;
}

export const BtnFinalConsumer: FC<Props> = ({ setClient }) => {
  const { data, isPending } = useClient('0999999999', true);

  if (!data) return null;

  const selectFinalConsumer = () => {
    setClient(data);
  };

  return (
    <>
      <Box
        sx={{
          border: '1px dotted',
          borderColor: 'secondary.main',
          borderRadius: 1,
          p: 1,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        {isPending ? (
          'Cargando...'
        ) : (
          <>
            <Typography variant='h4'>
              {data.person.lastName} {data.person.firstName}
            </Typography>
            <Button
              variant='outlined'
              size='small'
              onClick={selectFinalConsumer}
            >
              Seleccionar
            </Button>
          </>
        )}
      </Box>
    </>
  );
};
