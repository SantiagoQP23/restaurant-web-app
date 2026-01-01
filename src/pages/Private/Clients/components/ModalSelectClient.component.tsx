import { Add, Close } from '@mui/icons-material';
import {
  Dialog,
  DialogTitle,
  Typography,
  IconButton,
  ListItemText,
  Paper,
  InputBase,
  CircularProgress,
  DialogContent,
  Stack,
  Box
} from '@mui/material';
import { IClient } from '../../../../models';
import { FC } from 'react';
import { useClients } from '../hooks/useClients';
import SearchIcon from '@mui/icons-material/Search';

interface Props {
  onChange: (client: IClient | null) => void;

  onClose: () => void;

  open: boolean;
}

export const ModalSelectClient: FC<Props> = ({ open, onClose, onChange }) => {
  const { clientsQuery, handleChangeSearch, search } = useClients();

  const handleChange = (client: IClient) => {
    onChange(client);
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth='md'
      sx={{
        zIndex: 10500
      }}
    >
      <DialogTitle
        display='flex'
        justifyContent='space-between'
        alignItems='center'
      >
        <Typography variant='h4'>Clientes</Typography>
        <IconButton onClick={onClose}>
          <Close />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <Paper
          component='form'
          sx={{ p: '2px 4px', display: 'flex', alignItems: 'center' }}
          elevation={1}
        >
          <InputBase
            type='text'
            onChange={handleChangeSearch}
            sx={{ ml: 1, flex: 1 }}
            placeholder='Buscar cliente'
            inputProps={{ 'aria-label': 'Buscar cliente' }}
            value={search}
          />
          <IconButton
            type='button'
            sx={{ p: '10px' }}
            aria-label='search'
            // onClick={updateList}
          >
            {clientsQuery.isPending ? (
              <CircularProgress size={20} />
            ) : (
              <SearchIcon />
            )}
          </IconButton>
        </Paper>

        <Stack sx={{ width: 325, my: 2 }} direction='column' spacing={2}>
          {clientsQuery.data?.clients.map((client) => (
            <Box
              key={client.id}
              display='flex'
              justifyContent='space-between'
              alignItems='center'
            >
              <ListItemText
                primary={client.person.firstName + ' ' + client.person.lastName}
                secondary={client.person.email}
              />

              <IconButton size='small' onClick={() => handleChange(client)}>
                <Add />
              </IconButton>
            </Box>
          ))}
        </Stack>
      </DialogContent>
    </Dialog>
  );
};
