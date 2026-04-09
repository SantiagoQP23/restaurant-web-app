import { Roles } from '@/models/roles';

export interface NavItem {
  title: string;
  icon: JSX.Element;
  to: string;
  label?: string;
  allowedRoles?: Roles[];
  subItems?: NavItem[];
}
