import { useContext } from 'react';

import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  Menu,
  MenuItem
} from '@mui/material';
import { useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import ExpandMoreTwoToneIcon from '@mui/icons-material/ExpandMoreTwoTone';
import { ListItemButton, IconButton } from '@mui/material';
import { SidebarContext } from '../../../../Common/contexts/SidebarContext';

import MenuIcon from '@mui/icons-material/Menu';
import { PointOfSale } from '@mui/icons-material';
import { useCashRegisterStore } from '../../../../Common/store/useCashRegisterStore';

const ListWrapper = styled(Box)(
  ({ theme }) => `
        .MuiTouchRipple-root {
            display: none;
        }
        
        .MuiListItem-root {
            transition: ${theme.transitions.create(['color', 'fill'])};
            
            &.MuiListItem-indicators {
                padding: ${theme.spacing(1, 2)};
            
                .MuiListItemText-root {
                    .MuiTypography-root {
                        &:before {
                            height: 4px;
                            width: 22px;
                            opacity: 0;
                            visibility: hidden;
                            display: block;
                            position: absolute;
                            bottom: -10px;
                            transition: all .2s;
                            border-radius: ${theme.general.borderRadiusLg};
                            content: "";
                            // background: ${theme.colors.primary.main};
                        }
                    }
                }

                &.active,
                &:active,
                &:hover {
                
                    background: transparent;
                
                    .MuiListItemText-root {
                        .MuiTypography-root {
                            &:before {
                                opacity: 1;
                                visibility: visible;
                                bottom: 0px;
                            }
                        }
                    }
                }
            }
        }
`
);

function HeaderMenu() {
  const ref = useRef<any>(null);

  const { open, handleDrawerOpen } = useContext(SidebarContext);

  const { activeCashRegister } = useCashRegisterStore((state) => state);

  return (
    <>
      {/* <ListWrapper
        sx={{
          display: {
            xs: 'none',
            md: 'block',
          }
        }}
      > */}
      <List
        disablePadding
        component={Box}
        sx={{
          display: {
            xs: 'none',
            md: 'flex'
          },
          color: 'inherit',
          gap: 1
        }}
      >
        <ListItemButton
          onClick={handleDrawerOpen}
          sx={{
            ml: 1,
            color: 'text.primary',
            backgroundColor: (theme) => theme.header.background,

            ...(open && { display: 'none' })
          }}
        >
          <MenuIcon />
        </ListItemButton>
        {/* <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerOpen}
          >
          </IconButton> */}

        {/* <ListItemButton

          component={NavLink}
          to="/balance"
          sx={{
            ml: 2,
            color: 'text.primary',
            '&.active': {
              color: 'text.primary',
              bgcolor: 'action.selected',
              fontWeight: 'fontWeightBold',
            },
          }}
        >
          <ListItemIcon>
            <PointOfSale
          color={activeCashRegister ? 'success' : 'error'}

            />
          </ListItemIcon>
          <ListItemText
            primaryTypographyProps={{ noWrap: true, variant: 'h4' }}
            primary="Caja"
            secondary={activeCashRegister ? 'Abierta' : 'Cerrada'}
          /> 
          
        </ListItemButton> */}
        <ListItemButton
          // classes={{ root: 'MuiListItem-indicators' }}

          component={NavLink}
          to='/orders'
          sx={{
            // ml: 2,
            color: 'text.primary',
            '&.active': {
              color: 'text.primary',
              bgcolor: 'action.selected',
              fontWeight: 'fontWeightBold'
            }
          }}
        >
          <ListItemText
            primaryTypographyProps={{ noWrap: true, variant: 'h4' }}
            primary='Pedidos'
          />
        </ListItemButton>
        <ListItemButton
          // classes={{ root: 'MuiListItem-indicators' }}

          component={NavLink}
          to='/tables'
          sx={{
            color: 'text.primary',
            '&.active': {
              bgcolor: 'action.selected',
              fontWeight: 'fontWeightBold'
            }
          }}
        >
          <ListItemText
            primaryTypographyProps={{
              noWrap: true,
              variant: 'h4',
              color: 'inherit'
            }}
            primary='Mesas'
          />
        </ListItemButton>
        {/* 
          <ListItem
            classes={{ root: 'MuiListItem-indicators' }}
            button
            ref={ref}
            onClick={handleOpen}
          >
            <ListItemText
              primaryTypographyProps={{ noWrap: true }}
              primary={
                <Box display="flex" alignItems="center">
                  Menú
                  <Box display="flex" alignItems="center" pl={0.3}>
                    <ExpandMoreTwoToneIcon fontSize="small" />
                  </Box>
                </Box>
              }
            />
          </ListItem> */}
      </List>
      {/* </ListWrapper> */}
      {/* <Menu anchorEl={ref.current} onClose={handleClose} open={isOpen}>
        <MenuItem sx={{ px: 3 }} component={NavLink} to="/overview">
          Overview
        </MenuItem>
        <MenuItem sx={{ px: 3 }} component={NavLink} to="/components/tabs">
          Tabs
        </MenuItem>
        <MenuItem sx={{ px: 3 }} component={NavLink} to="/components/cards">
          Cards
        </MenuItem>
        <MenuItem sx={{ px: 3 }} component={NavLink} to="/components/modals">
          Modals
        </MenuItem>
      </Menu> */}
    </>
  );
}

export default HeaderMenu;
