import { FC, useContext } from 'react';

import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import { NavLink as RouterLink } from 'react-router-dom';

import { SidebarContext } from '../../../../Common/contexts/SidebarContext';
import { NavItem } from '../../../interfaces';
import { selectAuth } from '../../../../../../redux';
import { useSelector } from 'react-redux';
import { ValidRoles } from '../../../../Common/models/valid-roles.model';

interface Props {
  item: NavItem;
}

export const NavItemButton: FC<Props> = ({ item }) => {
  const { closeSidebar } = useContext(SidebarContext);

  const { user } = useSelector(selectAuth);

  if (
    item.allowedRoles &&
    !item.allowedRoles.includes(user?.role.name as ValidRoles)
  ) {
    return null;
  }

  return (
    <ListItem component='div' key={item.to}>
      <ListItemButton
        disableRipple
        component={RouterLink}
        onClick={closeSidebar}
        to={item.to!}
        sx={{
          minHeight: 48,
          justifyContent: 'initial',
          px: 2.5,
          '&.active': {
            color: 'primary.main',
            bgcolor: 'action.selected',
            fontWeight: 'bold'
          }
        }}
        end
      >
        <ListItemIcon
          sx={{
            minWidth: 0,
            mr: 1,
            justifyContent: 'center'
          }}
        >
          {item.icon}
        </ListItemIcon>
        <ListItemText
          primary={item.title}
          sx={{ opacity: 1, color: 'text.primary', variant: 'subtitle2' }}
        />
      </ListItemButton>
    </ListItem>
  );
};
