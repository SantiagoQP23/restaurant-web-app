import React, { FC, useState } from 'react';
import { ExpandMore, KeyboardArrowRight } from '@mui/icons-material';
import {
  Collapse,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText
} from '@mui/material';

import { NavItemButton } from './';
import { NavItem } from '../../../interfaces';
import { useSelector } from 'react-redux';
import { selectAuth } from '../../../../../../redux';
import { ValidRoles } from '../../../../Common/models/valid-roles.model';

interface Props {
  navItem: NavItem;
}

export const NavItemCollapsable: FC<Props> = ({ navItem }) => {
  const [open, setOpen] = useState(false);

  const { user } = useSelector(selectAuth);

  const handleClick = () => {
    setOpen(!open);
  };

  if (
    navItem.allowedRoles &&
    !navItem.allowedRoles.includes(user?.role.name as ValidRoles)
  ) {
    return null;
  }

  return (
    <>
      <List component='div'>
        <ListItem component='div'>
          <ListItemButton onClick={handleClick}>
            <ListItemIcon>{navItem.icon}</ListItemIcon>

            <ListItemText
              primary={navItem.title}
              sx={{ opacity: 1, color: 'text.primary' }}
            />
            <ListItemSecondaryAction>
              {open ? (
                <ExpandMore sx={{ fontSize: 18, color: 'text.primary' }} />
              ) : (
                <KeyboardArrowRight
                  sx={{ fontSize: 18, color: 'text.primary' }}
                />
              )}
            </ListItemSecondaryAction>
          </ListItemButton>
        </ListItem>
        <Collapse in={open} timeout='auto' unmountOnExit>
          <List>
            {navItem.subItems &&
              navItem.subItems.map((subItem, index) => (
                <NavItemButton key={index} item={subItem} />
              ))}
          </List>
        </Collapse>
      </List>
    </>
  );
};
