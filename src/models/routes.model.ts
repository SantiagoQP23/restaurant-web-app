export const PublicRoutes = {
  LOGIN: 'auth/login',
  SIGNUP: 'auth/signup',
  FORGOT_PASSWORD: 'auth/forgot-password',
  RESET_PASSWORD: 'auth/reset-password/:token'
};

export const PrivateRoutes = {
  MENU: 'orders/add/menu',
  MENU_EDIT: 'menu/edit/',
  ORDERS: 'orders',
  INVOICES: 'invoices',
  ACTIVE_ORDERS: 'active-orders',
  DASHBOARD: 'dashboard',
  CLIENTS: 'clients',
  TABLES: 'tables',
  USERS: 'users',
  REPORTS: 'reports',
  SETTINGS: 'settings',
  PROFILE: 'profile',
  BALANCE: 'balance',
  INCOMES: 'incomes',
  EXPENSES: 'expenses',
  SUPPLIERS: 'suppliers'
};
