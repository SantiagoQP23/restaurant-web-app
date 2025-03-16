import { ValidRoles } from '../../Common/models/valid-roles.model';

export interface NavItem {
  title: string;
  icon: JSX.Element;
  to: string;
  label?: string;
  allowedRoles?: ValidRoles[];
  subItems?: NavItem[];
}
