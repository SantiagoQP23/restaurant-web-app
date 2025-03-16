import { Container } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { DrawerSupplier } from './views/SuppliersList/components/DrawerSupplier.component';
import { useDrawerSupplierStore } from './store/drawerSupplierStore';

const Suppliers = () => {
  const { activeSupplier } = useDrawerSupplierStore();

  return (
    <>
      <Container maxWidth='lg'>
        <Outlet />
      </Container>
      {activeSupplier && <DrawerSupplier supplier={activeSupplier} />}
    </>
  );
};
export default Suppliers;
