import { FC } from 'react';

import { Box, Typography, Stack, Breadcrumbs } from '@mui/material';

import Link, { LinkProps } from '@mui/material/Link';

import { Link as RouterLink, useLocation } from 'react-router-dom';
import { CircleRounded } from '@mui/icons-material';

const breadcrumbNameMap: { [key: string]: string } = {
  '/orders': 'Pedidos',
  '/orders/list': 'Lista',
  '/orders/edit': 'Editar',
  '/orders/add': 'Nuevo pedido',
  '/orders/add/menu': 'Productos',

  [`/orders/edit/:id`]: 'id',
  '/orders/edit/ljasd/receipt': 'Comprobante',
  '/orders/actives': 'Activos',
  '/orders/menu': 'Nuevo pedido',
  '/drafts': 'Drafts',
  '/menu': 'Menú',
  '/menu/products': 'Productos',
  '/menu/products/edit': 'Editar',
  '/menu/products/add': 'Nuevo producto',
  '/menu/categories': 'Categorías',
  '/menu/sections': 'Secciones',
  '/menu/edit': 'Editar',
  '/menu/edit/seccion': 'Seccion',
  '/menu/edit/category': 'Categoría',
  '/menu/edit/product': 'Producto',
  '/users': 'Usuarios',
  '/users/edit': 'Editar',
  '/users/add': 'Nuevo usuario',
  '/tables': 'Mesas',
  '/tables/edit': 'Editar',
  '/tables/add': 'Nueva mesa',
  '/clients': 'Clientes',
  '/clients/edit': 'Editar',
  '/clients/add': 'Nuevo cliente',
  '/balance': 'Balance',

  '/shop/menu': 'Menú',
  '/shop': 'Menú',

  '/reports': 'Dashboard',
  '/reports/products': 'Productos',
  '/reports/incomes': 'Ingresos',
  '/reports/prediction': 'Predicción de afluencia',
  '/reports/simulation': 'Simulación de afluencia',
  '/reports/staff-planning': 'Planificación de personal'
};

interface LinkRouterProps extends LinkProps {
  to: string;
  replace?: boolean;
}

function LinkRouter(props: LinkRouterProps) {
  return <Link {...props} component={RouterLink as any} />;
}

interface Props {
  title: string;
  action?: React.ReactNode;
  breadcrumbEnd?: string;
}

export const TitlePage: FC<Props> = ({ title, action }) => {
  const location = useLocation();

  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <Stack
      spacing={1}
      my={2}
      direction={{ xs: 'column', sm: 'row' }}
      justifyContent={{ xs: 'normal', sm: 'space-between' }}
      alignItems={{ sm: 'center' }}
    >
      <Stack direction='row' alignItems='center' justifyContent='flex-start'>
        <Box>
          <Typography variant='h3' fontWeight={500}>
            {title}
          </Typography>
          <Breadcrumbs
            separator={<CircleRounded sx={{ fontSize: 6, color: '#888' }} />}
          >
            {pathnames.map((value, index) => {
              const last = index === pathnames.length - 1;
              const to = `/${pathnames.slice(0, index + 1).join('/')}`;

              if (breadcrumbNameMap[to]) {
                return last ? (
                  <Typography color='text.primary' key={to}>
                    {breadcrumbNameMap[to]}
                  </Typography>
                ) : (
                  <LinkRouter
                    underline='hover'
                    color='inherit'
                    to={to}
                    key={to}
                  >
                    {breadcrumbNameMap[to]}
                  </LinkRouter>
                );
              }
            })}
          </Breadcrumbs>
        </Box>
      </Stack>

      <Stack direction='row' justifyContent='flex-end'>
        {action}
      </Stack>
    </Stack>
  );
};
