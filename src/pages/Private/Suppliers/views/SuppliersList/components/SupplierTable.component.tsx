import { Edit } from '@mui/icons-material';
import {
  Card,
  CardHeader,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow
} from '@mui/material';
import { useDrawerSupplierStore } from '../../../store/drawerSupplierStore';
import { Supplier } from '../../../models/supplier.model';
import { useSuppliers } from '../../../hooks/useSuppliers';

export const SupplierTable = () => {
  const { setActiveSupplier, setOpen } = useDrawerSupplierStore();

  const { suppliersQuery } = useSuppliers();

  const handleOpenDrawer = (supplier: Supplier) => {
    setActiveSupplier(supplier);
    setOpen(true);
  };

  return (
    <>
      <Card>
        <CardHeader title='Lista de proveedores' />

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nombre</TableCell>
                <TableCell>Telefono</TableCell>
                <TableCell>Email</TableCell>
                <TableCell align='center'>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {suppliersQuery.data?.map((supplier) => (
                <TableRow key={supplier.id}>
                  <TableCell
                    sx={{
                      whiteSpace: 'nowrap'
                    }}
                  >
                    {supplier.person.firstName} {supplier.person.lastName}{' '}
                  </TableCell>
                  <TableCell>{supplier.person.numPhone}</TableCell>
                  <TableCell>{supplier.person.email}</TableCell>
                  <TableCell align='center'>
                    <IconButton
                      onClick={() => handleOpenDrawer(supplier)}
                      color='primary'
                    >
                      <Edit />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component='div'
          count={100}
          rowsPerPage={5}
          page={0}
          onPageChange={() => {}}
          onRowsPerPageChange={() => {}}
        />
      </Card>
    </>
  );
};
