import { Breadcrumbs, Link, Typography } from '@mui/material';
import { useLocation, Link as LinkRouter } from 'react-router-dom';

const breadcrumbNameMap: { [key: string]: string } = {
  '/menu': 'Menu',
  '/menu/edit': 'Editar',
  '/clients': 'Clientes',
  '/menu/edit/seccion': 'Section',
  '/menu/edit/category': 'Category',
  '/drafts': 'Drafts'
};

export const BreadcrumbsRouter = () => {
  const location = useLocation();

  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <>
      <Breadcrumbs className='MuiPageTitle-wrapper' sx={{ p: 1, pl: 3 }}>
        <LinkRouter to='/'>Home</LinkRouter>
        {pathnames.map((value, index) => {
          const last = index === pathnames.length - 1;
          const to = `/${pathnames.slice(0, index + 1).join('/')}`;

          return last ? (
            <Typography color='text.primary' key={to}>
              {breadcrumbNameMap[to]}
            </Typography>
          ) : (
            <LinkRouter color='inherit' to={to} key={to}>
              {breadcrumbNameMap[to]}
            </LinkRouter>
          );
        })}
      </Breadcrumbs>
    </>
  );
};
