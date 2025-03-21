import { MenuSection } from '../../interfaces';

import {
  AccountBalanceWallet,
  Assignment,
  FiberManualRecord,
  ListAlt,
  MenuBook,
  ReceiptLong,
  SoupKitchen,
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
  title: 'GENERAL',
  allowedRoles: [ValidRoles.admin],
  items: [
    {
      title: 'Dashboard',
      icon: <DashboardOutlinedIcon />,
      to: '/reports'
    },
    {
      title: "Finanzas",
      icon: <AccountBalanceWallet />,
      to: "/financial",
      subItems: [
        {
          title: "Transacciones",
          to: "/financial/transactions",
          icon: <FiberManualRecord sx={{ fontSize: 8 }} />,
        },
        {
          title: "Caja",
          to: "/financial/cash-register/actives",
          icon: <FiberManualRecord sx={{ fontSize: 8 }} />,
        },
        // {
        //   title: "Cuentas",
        //   to: "/financial/accounts",
        //   icon: <FiberManualRecord sx={{ fontSize: 8 }} />,
        // },

      ],
    },
  ]
};

/**
 * Routes for orders
 * @version v1.1 22-12-2023 Change invoices for bills
 */
const ordersSection = {
  title: 'PEDIDOS',
  items: [
    {
      title: 'Pedidos',
      icon: <Assignment />,
      to: '/orders/'
    },
    {
      title: 'Preparación de pedidos',
      icon: <SoupKitchen />,
      to: '/orders/actives'
      // allowedRoles: [ValidRoles.mesero],
    },
    {
      title: 'Lista de pedidos',
      icon: <ListAlt />,
      to: '/orders/list'
    },
    {
      title: 'Cuentas',
      icon: <ReceiptLong />,
      to: '/bills'
    }
  ]
};

const advancedManagementSection = {
  title: 'ADMINISTRACIÓN AVANZADA',
  allowedRoles: [ValidRoles.admin],
  items: [
    {
      title: 'Gestión de usuarios',
      icon: <PeopleOutlineIcon />,
      to: '/users'
    },
    {
      title: 'Restaurante',
      icon: <Storefront />,
      to: '/restaurant',
      label: 'Nuevo'
    }
  ]
};

const managementSection = {
  title: 'ADMINISTRACIÓN',
  items: [
    {
      title: 'Menú del restaurante',
      icon: <MenuBook />,
      to: '/menu/sections',
      subItems: [
        {
          title: 'Secciones',
          to: '/menu/sections',
          icon: <FiberManualRecord sx={{ fontSize: 8 }} />
        },
        {
          title: 'Categorías',
          to: '/menu/categories',
          icon: <FiberManualRecord sx={{ fontSize: 8 }} />
          // allowedRoles: [ValidRoles.mesero],
        },
        {
          title: 'Productos',
          to: '/menu/products',
          icon: <FiberManualRecord sx={{ fontSize: 8 }} />
        }
      ]
    },
    {
      title: 'Gestión de mesas',
      icon: <TableRestaurantOutlinedIcon />,
      to: '/tables'
    },
    {
      title: 'Gestión de clientes',
      icon: <Groups3OutlinedIcon />,
      to: '/clients'
    }
  ]
};

export const menuSections: MenuSection[] = [
  generalSection,
  ordersSection,
  managementSection,
  advancedManagementSection
];
