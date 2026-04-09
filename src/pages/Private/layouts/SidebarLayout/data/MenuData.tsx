import { MenuSection } from '../../interfaces';

import {
  AssignmentOutlined,
  FiberManualRecord,
  ListAltOutlined,
  MenuBookOutlined,
  SoupKitchenOutlined,
  Storefront
} from '@mui/icons-material';

import Groups3OutlinedIcon from '@mui/icons-material/Groups3Outlined';
import TableRestaurantOutlinedIcon from '@mui/icons-material/TableRestaurantOutlined';

import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';

import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';

import { ValidRoles } from '../../../Common/models/valid-roles.model';

/**
 * @version 1.1 31-01-2025 Remove finance
 * @author Steven Rosales
 * @version 1.2 20-03-2025 Add cash register
 */
const generalSection: MenuSection = {
  title: '',
  // allowedRoles: [ValidRoles.admin],
  items: [
    {
      title: 'Dashboard',
      icon: <DashboardOutlinedIcon fontSize='small' />,
      to: '/reports',
      allowedRoles: [ValidRoles.admin]
    },
    {
      title: 'Restaurante',
      icon: <Storefront fontSize='small' />,
      to: '/restaurant',
      label: 'Nuevo',
      allowedRoles: [ValidRoles.admin]
    },
    {
      title: 'Pedidos',
      icon: <AssignmentOutlined fontSize='small' />,
      to: '/orders/'
    },
    {
      title: 'Mesas',
      icon: <TableRestaurantOutlinedIcon fontSize='small' />,
      to: '/orders/tables'
    },
    {
      title: 'Preparación de pedidos',
      icon: <SoupKitchenOutlined fontSize='small' />,
      to: '/orders/actives'
      // allowedRoles: [ValidRoles.mesero],
    },
    {
      title: 'Lista de pedidos',
      icon: <ListAltOutlined fontSize='small' />,
      to: '/orders/list',
      allowedRoles: [ValidRoles.admin]
    },
    {
      title: 'Menú del restaurante',
      icon: <MenuBookOutlined fontSize='small' />,
      to: '/menu/sections',
      allowedRoles: [ValidRoles.admin]
    },
    {
      title: 'Gestión de mesas',
      icon: <TableRestaurantOutlinedIcon fontSize='small' />,
      to: '/tables',
      allowedRoles: [ValidRoles.admin]
    },
    {
      title: 'Gestión de usuarios',
      icon: <PeopleOutlineIcon fontSize='small' />,
      to: '/users',
      allowedRoles: [ValidRoles.admin]
    }
  ]
};

/**
 * Routes for orders
 * @version v1.1 22-12-2023 Change invoices for bills
 */
const ordersSection = {
  title: 'Pedidos',
  items: [
    {
      title: 'Pedidos',
      icon: <AssignmentOutlined fontSize='small' />,
      to: '/orders/'
    },
    {
      title: 'Mesas',
      icon: <AssignmentOutlined fontSize='small' />,
      to: '/orders/tables'
    },
    {
      title: 'Preparación de pedidos',
      icon: <SoupKitchenOutlined fontSize='small' />,
      to: '/orders/actives'
      // allowedRoles: [ValidRoles.mesero],
    },
    {
      title: 'Lista de pedidos',
      icon: <ListAltOutlined fontSize='small' />,
      to: '/orders/list'
    }
    // {
    //   title: 'Cuentas',
    //   icon: <ReceiptLongOutlined fontSize='small' />,
    //   to: '/bills'
    // }
  ]
};

const managementSection = {
  title: 'Administración',
  allowedRoles: [ValidRoles.admin],
  items: [
    {
      title: 'Menú del restaurante',
      icon: <MenuBookOutlined fontSize='small' />,
      to: '/menu/sections'
      // subItems: [
      //   {
      //     title: 'Secciones',
      //     to: '/menu/sections',
      //     icon: <FiberManualRecord sx={{ fontSize: 8 }} />
      //   },
      //   {
      //     title: 'Categorías',
      //     to: '/menu/categories',
      //     icon: <FiberManualRecord sx={{ fontSize: 8 }} />
      //     // allowedRoles: [ValidRoles.mesero],
      //   },
      //   {
      //     title: 'Productos',
      //     to: '/menu/products',
      //     icon: <FiberManualRecord sx={{ fontSize: 8 }} />
      //   }
      // ]
    },
    {
      title: 'Gestión de mesas',
      icon: <TableRestaurantOutlinedIcon fontSize='small' />,
      to: '/tables'
    },
    {
      title: 'Gestión de usuarios',
      icon: <PeopleOutlineIcon fontSize='small' />,
      to: '/users'
    }
    // {
    //   title: 'Gestión de clientes',
    //   icon: <Groups3OutlinedIcon />,
    //   to: '/clients'
    // }
  ]
};

export const menuSections: MenuSection[] = [
  generalSection
  // ordersSection,
  // managementSection
];
