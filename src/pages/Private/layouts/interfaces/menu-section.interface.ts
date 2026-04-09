import { Roles } from '@/models/roles';
import { NavItem } from './nav-item.interface';

export interface MenuSection {
  title: string;
  items: NavItem[];
  allowedRoles?: Roles[];
}
