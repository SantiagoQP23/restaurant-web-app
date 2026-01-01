import {
  Typography,
  Select,
  MenuItem,
  TextField,
  InputLabel,
  FormControl,
  Card,
  CardContent,
  CardHeader,
  Button,
  Grid,
  TablePagination,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import { useEffect } from 'react';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import { useQuery } from '@tanstack/react-query';
import {
  BestSellingCategoriesResponse,
  ResultBestSellingProducts,
  getBestSellingCategories,
  getBestSellingProducts
} from '../../services/dashboard.service';
import { Print } from '@mui/icons-material';
import { usePaginationAsync } from '../../../../../hooks/usePaginationAsync';
import { useSelector } from 'react-redux';
import { selectMenu } from '../../../../../redux';
import { Chip } from '@mui/material';
import { TitlePage } from '../../../components/TitlePage.component';
import { useFilterSoldProducts } from '../../hooks/useFilterSoldProducts';
import { CategoriesBestSelling } from '../IncomesReports/components/CategoriesBestSelling.component';
import { NavLink as RouterLink } from 'react-router-dom';
import { formatMoney } from '../../../Common/helpers/format-money.helper';
import { generateProductsReport } from '../../helpers/pdf-products-reports';
import { Period, GroupBy } from '../../../Common/dto/period.model';

export const ProductsReports = () => {
  // const {
  //   period,
  //   startDate,
  //   endDate,
  //   endDateChecked,
  //   handleChangeEndDate,
  //   handleChangeEndDateChecked,
  //   handleChangePeriod,
  //   handleChangeStartDate,

  // } = useDateFilter(Period.TODAY);

  const { sections, products, categories } = useSelector(selectMenu);

  const filters = useFilterSoldProducts(Period.DAILY);

  const {
    period,
    startDate,
    endDate,
    endDateChecked,
    handleChangeEndDate,
    handleChangePeriod,
    handleChangeStartDate,
    groupBy,
    customGroupBy
  } = filters;

  const {
    page,
    rowsPerPage,

    handleChangePage,
    handleChangeRowsPerPage
  } = usePaginationAsync();

  const { data, refetch } = useQuery<ResultBestSellingProducts>({
    queryKey: [
      'best-selling-products',
      { period, startDate, endDate, offset: page, limit: rowsPerPage }
    ],
    queryFn: () => {
      return getBestSellingProducts({
        period,
        startDate,
        endDate: endDateChecked ? endDate : null,
        offset: page,
        limit: rowsPerPage,
        groupBy,
        customGroupBy
      });
    }
  });

  useEffect(() => {
    if (data) {
      console.log(data);
    }
  }, [data]);

  const categoriesQuery = useQuery<BestSellingCategoriesResponse>({
    queryKey: [
      'best-selling-categories',
      { period, startDate, endDate, offset: page, limit: rowsPerPage }
    ],
    queryFn: () => {
      return getBestSellingCategories({
        period,
        startDate,
        endDate: endDateChecked ? endDate : null,
        offset: page,
        limit: rowsPerPage,
        groupBy,
        customGroupBy
      });
    }
  });

  useEffect(() => {
    if (categoriesQuery.data) {
      console.log(categoriesQuery.data);
    }
  }, [categoriesQuery.data]);

  const handlePrint = async () => {
    if (data && categoriesQuery.data) {
      const pdf = await generateProductsReport(
        filters,
        categoriesQuery.data,
        data
      );
      pdf.open();
    }
  };

  useEffect(() => {
    refetch();
    categoriesQuery.refetch();
  }, [
    page,
    rowsPerPage,
    period,
    endDateChecked,
    startDate,
    endDate,
    groupBy,
    customGroupBy
  ]);

  return (
    <>
      <TitlePage
        title='Productos'
        action={
          <Button
            variant='contained'
            startIcon={<Print />}
            onClick={handlePrint}
          >
            Imprimir
          </Button>
        }
      />

      <Grid container spacing={2} my={1}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardHeader
              title='Secciones'
              // subheader='Secciones registradas'
              action={
                <Button
                  variant='outlined'
                  component={RouterLink}
                  to='/menu'
                  size='small'
                >
                  Administrar
                </Button>
              }
            />

            <CardContent
              sx={{
                display: 'flex',
                gap: 1,
                alignItems: 'center'
              }}
            >
              <Typography variant='h3'>{sections.length}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardHeader
              title='Categorías'
              // subheader='Categorías registradas'
              action={
                <Button
                  variant='outlined'
                  component={RouterLink}
                  to='/menu'
                  size='small'
                >
                  Administrar
                </Button>
              }
            />

            <CardContent
              sx={{
                display: 'flex',
                gap: 1,
                alignItems: 'center'
              }}
            >
              <Typography variant='h3'>{categories.length}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardHeader
              title='Productos'
              // subheader='Productos registrados'
              action={
                <Button
                  variant='outlined'
                  component={RouterLink}
                  to='/menu'
                  size='small'
                >
                  Administrar
                </Button>
              }
            />

            <CardContent
              sx={{
                display: 'flex',
                gap: 1,
                alignItems: 'center'
              }}
            >
              <Typography variant='h3'>{products.length}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={2} mt={1}>
        <Grid item xs={12} md={2}>
          <FormControl fullWidth>
            <InputLabel id='select-period-label'>Periodo</InputLabel>
            <Select
              labelId='select-period-label'
              value={period}
              onChange={handleChangePeriod}
              fullWidth
              label='Periodo'
              size='medium'
            >
              <MenuItem value={Period.DAILY}>Diario</MenuItem>
              <MenuItem value={Period.MONTHLY}>Mensual</MenuItem>
              <MenuItem value={Period.YEARLY}>Anual</MenuItem>
              {GroupBy.DAY !== groupBy && <></>}

              {GroupBy.DAY === groupBy && (
                <MenuItem value={Period.CUSTOM}>Personalizado</MenuItem>
              )}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={2}>
          <DesktopDatePicker
            label='Fecha de inicio'
            inputFormat={
              period === Period.MONTHLY
                ? 'yyyy MMMM'
                : period === Period.YEARLY
                  ? 'yyyy'
                  : 'yyyy-MM-dd'
            }
            value={startDate}
            onChange={handleChangeStartDate}
            renderInput={(params) => <TextField {...params} />}
            disableFuture
            maxDate={endDate ? endDate : undefined}
            views={
              period === Period.MONTHLY
                ? ['year', 'month']
                : period === Period.YEARLY
                  ? ['year']
                  : ['day']
            }
          />
        </Grid>

        {startDate && period === Period.CUSTOM && (
          <Grid item xs={12} md={2}>
            <DesktopDatePicker
              label='Fecha de fin'
              inputFormat='yyyy-MM-dd'
              value={endDate}
              onChange={handleChangeEndDate}
              renderInput={(params) => <TextField {...params} />}
              minDate={startDate}
              disableFuture
            />
          </Grid>
        )}
      </Grid>

      <Grid container spacing={2} my={1}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader
              title='Productos más vendidos'
              // action={
              //   <Button
              //     size='small'
              //     variant='contained'
              //     startIcon={<Print />}
              //   >
              //     Imprimir
              //   </Button>
              // }
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
                          <Typography variant='h6'>
                            {product.totalSold}
                          </Typography>
                        </TableCell>
                        <TableCell align='right'>
                          <Typography variant='h6' color='success'>
                            {formatMoney(
                              product.totalSold * product.productPrice
                            )}
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

            <TablePagination
              page={page}
              count={data?.count || 0}
              rowsPerPage={rowsPerPage}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              rowsPerPageOptions={[10, 25, 50, 100]}
            />
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <CategoriesBestSelling categoriesQuery={categoriesQuery} />
        </Grid>
      </Grid>
    </>
  );
};
