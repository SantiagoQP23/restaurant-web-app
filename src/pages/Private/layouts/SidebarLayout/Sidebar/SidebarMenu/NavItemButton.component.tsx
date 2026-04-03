import { FC, useContext } from 'react';

import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useTheme,
  useMediaQuery,
  IconButton,
  Tooltip
} from '@mui/material';
import { NavLink as RouterLink, useMatch, useNavigate } from 'react-router-dom';

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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'));

  const { user } = useSelector(selectAuth);
  const navigate = useNavigate();
  const match = useMatch(item.to);

  // Only close sidebar on mobile/tablet devices
  const handleClick = () => {
    if (isMobile) {
      closeSidebar();
    }
    navigate(item.to);
  };

  if (
    item.allowedRoles &&
    !item.allowedRoles.includes(user?.role.name as ValidRoles)
  ) {
    return null;
  }

  return (
    <ListItem component='div' key={item.to}>
      <Tooltip title={item.title} placement='right' arrow>
        <IconButton
          onClick={handleClick}
          // color={match ? 'primary' : 'primary'}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
            color: match
              ? theme.colors.alpha.trueWhite[70]
              : theme.palette.primary.main,
            backgroundColor: match
              ? 'primary.main'
              : theme.colors.alpha.trueWhite[10]
          }}
        >
          {item.icon}
        </IconButton>
      </Tooltip>
    </ListItem>
  );
};
