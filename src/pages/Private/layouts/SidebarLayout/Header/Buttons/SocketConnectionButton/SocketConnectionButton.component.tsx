import { useContext, useRef, useState } from 'react';
import {
  IconButton,
  useTheme,
  Stack,
  Box,
  Typography,
  CircularProgress
} from '@mui/material';
import {
  ExpandLess,
  SyncOutlined,
  WifiTethering,
  WifiTetheringErrorOutlined
} from '@mui/icons-material';
import { SocketContext } from '../../../../../../../context';
import { Popover, Button } from '@mui/material/';
import { Label } from '../../../../../../../components/ui';
import { LoadingButton } from '@mui/lab';

import './SocketConnectionButton.styles.css';

export const SocketConnectionButton = () => {
  const ref = useRef<any>(null);
  const [isOpen, setOpen] = useState<boolean>(false);

  const { online, conectarSocket } = useContext(SocketContext);

  const handleOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  const theme = useTheme();

  return (
    <>
      {!online && (
        <>
          <IconButton
            ref={ref}
            onClick={handleOpen}
            color='error'
            className='parpadeo'
          >
            <WifiTetheringErrorOutlined />
          </IconButton>
        </>
      )}

      <Popover
        anchorEl={ref.current}
        onClose={handleClose}
        open={isOpen}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
      >
        <Box
          sx={{ p: 2, width: 250 }}
          display='flex'
          alignItems='center'
          justifyContent='space-between'
        >
          {online ? (
            <Typography variant='h4' color='success'>
              Conectado
            </Typography>
          ) : (
            <Typography variant='h4' color='error'>
              Sin conexión
            </Typography>
          )}
          <Stack direction='row' spacing={1} alignItems='center'>
            <IconButton onClick={handleClose}>
              <ExpandLess />
            </IconButton>
          </Stack>
        </Box>

        <Box display='flex' flexDirection='column' gap={2}>
          <Box display='flex' justifyContent='center'>
            {online ? (
              <WifiTethering fontSize='large' color='success' />
            ) : (
              <WifiTetheringErrorOutlined fontSize='large' color='error' />
            )}
          </Box>

          {!online && (
            <Box display='flex' justifyContent='center'>
              <LoadingButton
                endIcon={<SyncOutlined />}
                onClick={conectarSocket}
              >
                Conectar
              </LoadingButton>
            </Box>
          )}

          {online && (
            <Box
              display='flex'
              justifyContent='center'
              flexDirection='column'
              mb={2}
            >
              <Typography variant='h4' color='success.main' textAlign='center'>
                Conexión exitosa
              </Typography>

              <Typography variant='subtitle2' textAlign='center'>
                Puede continuar con sus operaciones
              </Typography>
            </Box>
          )}
        </Box>
      </Popover>
    </>
  );
};
