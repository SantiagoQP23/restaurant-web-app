import { Add } from '@mui/icons-material';
import {
  Card,
  CardHeader,
  Button,
  List,
  Typography,
  Grid,
  Stack,
  Box
} from '@mui/material';
import NiceModal from '@ebay/nice-modal-react';
import { ModalCreateProductionArea } from './ModalCreateProductionArea.component';
import { ProductionAreaItem } from './ProductionAreaItem.component';
import { useProductionAreasStore } from '../../Common/store/production-areas-store';

/**
 * Component to list the production areas
 * @author Santiago Quirumbay
 * @version 1.0 16/12/2023.
 */
export const ProductionAreasList = () => {
  const { productionAreas } = useProductionAreasStore();

  const showModalCreateArea = () => {
    NiceModal.show(ModalCreateProductionArea);
  };

  return (
    <>
      <Stack gap={2} mb={2}>
        <Typography variant='h6' gutterBottom>
          Gestión de áreas de producción
        </Typography>
        <Grid container spacing={2}>
          {productionAreas &&
            productionAreas.map((area) => (
              <Grid item xs={12} md={6} key={area.id}>
                <ProductionAreaItem key={area.id} area={area} />
              </Grid>
            ))}
        </Grid>
        <Box>
          <Button startIcon={<Add />} onClick={showModalCreateArea}>
            Crear nueva área
          </Button>
        </Box>
      </Stack>
    </>
  );
};
