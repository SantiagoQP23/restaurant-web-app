import { ExpandLess, PointOfSale } from '@mui/icons-material';
import {
  Box,
  Divider,
  IconButton,
  Stack,
  Typography,
  useTheme
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useCashRegisterStore } from '../../../../../Common/store/useCashRegisterStore';
import { Popover, Button } from '@mui/material/';
import { useRef, useState } from 'react';
import { CashRegisterSummary } from './CashRegisterSummary.component';

export const CashRegisterPopover = () => {
  const ref = useRef<any>(null);
  const [isOpen, setOpen] = useState<boolean>(false);

  const handleOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  const { cashRegisters } = useCashRegisterStore();

  const navigate = useNavigate();
  const theme = useTheme();

  return (
    <>
      <IconButton ref={ref} onClick={handleOpen}>
        <PointOfSale color={cashRegisters.length > 0 ? 'success' : 'error'} />
      </IconButton>

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
          sx={{
            p: 2,
            width: 250
          }}
          display='flex'
          alignItems='center'
          justifyContent='space-between'
        >
          <Typography variant='h4'>Cajas </Typography>
          <Stack direction='row' spacing={1} alignItems='center'>
            <IconButton onClick={handleClose}>
              <ExpandLess />
            </IconButton>
          </Stack>
        </Box>

        {cashRegisters.length > 0 ? (
          <>
            <Stack spacing={1} px={1} mb={1} divider={<Divider />}>
              {cashRegisters.map((cashRegister) => (
                <CashRegisterSummary
                  cashRegister={cashRegister}
                  key={cashRegister.id}
                />
              ))}
            </Stack>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center'
              }}
              mb={1}
            >
              <Button
                size='small'
                startIcon={<PointOfSale />}
                onClick={() => {
                  navigate('/balance');
                }}
              >
                Ver más
              </Button>
            </Box>
          </>
        ) : (
          <>
            <Box m={2}>
              <Typography textAlign='center'>No hay cajas activas</Typography>
            </Box>
          </>
        )}
      </Popover>
    </>
  );
};
