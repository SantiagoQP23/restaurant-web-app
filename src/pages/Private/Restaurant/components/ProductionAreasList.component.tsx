import { Add } from '@mui/icons-material';
import { Card, CardHeader, Button, List } from '@mui/material';
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
      <Card>
        <CardHeader
          title='Areas de producción'
          action={
            <Button startIcon={<Add />} onClick={showModalCreateArea}>
              Crear
            </Button>
          }
        />

        <List>
          {productionAreas &&
            productionAreas.map((area) => (
              <ProductionAreaItem key={area.id} area={area} />
            ))}
        </List>
      </Card>
    </>
  );
};
