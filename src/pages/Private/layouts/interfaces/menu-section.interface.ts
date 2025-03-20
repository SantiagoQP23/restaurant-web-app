import { ValidRoles } from '../../Common/models/valid-roles.model';
import { NavItem } from './nav-item.interface';

export interface MenuSection {
  title: string;
  items: NavItem[];
  allowedRoles?: ValidRoles[];
}
