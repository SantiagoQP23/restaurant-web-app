import {
  Card,
  CardHeader,
  Button,
  Typography,
  Chip,
  Table,
  TableContainer,
  TableBody,
  TableRow,
  TableCell,
  TableHead
} from '@mui/material';
import { NavLink as RouterLink } from 'react-router-dom';
import {
  ResultBestSellingProducts,
  getBestSellingProducts
} from '../../../services/dashboard.service';
import { useQuery } from '@tanstack/react-query';
import { CustomGroupBy } from '../../../hooks/useFilterSoldProducts';
import { ArrowRight } from '@mui/icons-material';
import { formatMoney } from '../../../../Common/helpers/format-money.helper';
import { GroupBy, Period } from '../../../../Common/dto/period.model';

export const BestSellingProductsSummary = () => {
  const { data } = useQuery<ResultBestSellingProducts>({
    queryKey: [
      'best-selling-products',
      { period: Period.DAILY, offset: 0, limit: 5 }
    ],
    queryFn: () => {
      return getBestSellingProducts({
        period: Period.MONTHLY,
        offset: 0,
        limit: 5,
        groupBy: GroupBy.DAY,
        customGroupBy: CustomGroupBy.PRODUCT,
        startDate: new Date(),
        endDate: new Date()
      });
    }
  });

  return (
    <Card>
      <CardHeader
        title='Productos'
        subheader='Productos más vendidos del mes'
        action={
          <Button
            component={RouterLink}
            to='products'
            size='small'
            color='inherit'
            endIcon={<ArrowRight />}
          >
            Ver todo
          </Button>
        }
      />

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Producto</TableCell>
              <TableCell>Categoría</TableCell>
              <TableCell align='center'>Cantidad</TableCell>
              <TableCell align='right'>Total</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {data?.products.length ? (
              data.products?.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <Typography variant='h6' whiteSpace='nowrap'>
                      {product.productName}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip label={product.categoryName} size='small' />
                  </TableCell>
                  <TableCell align='center'>
                    <Typography variant='h6'>{product.totalSold}</Typography>
                  </TableCell>
                  <TableCell align='right'>
                    <Typography variant='h6' color='success'>
                      {formatMoney(product.totalSold * product.productPrice)}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <>
                <TableRow>
                  <TableCell colSpan={4} align='center'>
                    <Typography variant='h6'>
                      No hay datos para mostrar
                    </Typography>
                  </TableCell>
                </TableRow>
              </>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
};
