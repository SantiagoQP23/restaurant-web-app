import NiceModal, { useModal } from '@ebay/nice-modal-react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  Stack,
  Box,
  Typography,
  InputAdornment
} from '@mui/material';
import { useState } from 'react';
import { LoadingButton } from '@mui/lab';
import { AttachMoney } from '@mui/icons-material';
import { ProductForm } from '../CreateProduct.view';

interface ModalSelectDefaultVariantProps {
  variants: ProductForm['variants'];
  onConfirm: (selectedIndex: number) => void;
}

export const ModalSelectDefaultVariant =
  NiceModal.create<ModalSelectDefaultVariantProps>(
    ({ variants, onConfirm }) => {
      const modal = useModal();
      const [selectedIndex, setSelectedIndex] = useState<number>(0);
      const [isLoading, setIsLoading] = useState(false);

      const handleClose = () => {
        modal.hide();
      };

      const handleConfirm = () => {
        setIsLoading(true);
        // Simulate minimal async operation for consistency
        setTimeout(() => {
          onConfirm(selectedIndex);
          handleClose();
          setIsLoading(false);
        }, 100);
      };

      if (!variants || variants.length === 0) {
        return null;
      }

      return (
        <Dialog
          open={modal.visible}
          onClose={handleClose}
          maxWidth='xs'
          fullWidth
        >
          <DialogTitle>Seleccionar variante por defecto</DialogTitle>
          <DialogContent sx={{}}>
            <Typography variant='body2' color='textSecondary' sx={{ mb: 2 }}>
              Selecciona cuál será la variante por defecto para este producto
            </Typography>
            <RadioGroup
              value={selectedIndex}
              onChange={(e) => setSelectedIndex(parseInt(e.target.value))}
            >
              <Stack>
                {variants.map((variant, index) => (
                  <Box
                    key={index}
                    sx={{
                      cursor: 'pointer'
                    }}
                    onClick={() => setSelectedIndex(index)}
                  >
                    <FormControlLabel
                      value={index}
                      control={<Radio />}
                      label={
                        <Stack direction='row' spacing={1} alignItems='center'>
                          <Typography variant='subtitle2' fontWeight={600}>
                            {variant.name}
                          </Typography>
                          <Box display='flex' gap={1}>
                            <Box display='flex' alignItems='center' gap={0.5}>
                              <AttachMoney sx={{ fontSize: '0.875rem' }} />
                              <Typography variant='body2'>
                                {variant.price.toFixed(2)}
                              </Typography>
                            </Box>
                          </Box>
                        </Stack>
                      }
                      sx={{
                        width: '100%',
                        ml: 0,
                        mr: 0
                      }}
                    />
                  </Box>
                ))}
              </Stack>
            </RadioGroup>
          </DialogContent>
          <DialogActions sx={{ p: 2 }}>
            <Button onClick={handleClose} color='inherit'>
              Cancelar
            </Button>
            <LoadingButton
              variant='contained'
              loading={isLoading}
              onClick={handleConfirm}
            >
              Confirmar
            </LoadingButton>
          </DialogActions>
        </Dialog>
      );
    }
  );
