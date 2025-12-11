import { FC } from 'react';
import {
  List,
  ListSubheader,
  Typography,
  styled,
  Box,
  alpha
} from '@mui/material';
import { NavItemButton } from './';
import { ValidRoles } from '../../../../Common/models/valid-roles.model';
import { useSelector } from 'react-redux';
import { selectAuth } from '../../../../../../redux';
import { NavItemCollapsable } from './NavItemCollapsable.component';
import { MenuSection as IMenuSection } from '../../../interfaces';

interface Props {
  section: IMenuSection;
}

const SubMenuWrapper = styled(Box)(
  ({ theme }) => `
    .MuiList-root {

      .MuiListItem-root {
        padding: 1px 0;

        .MuiBadge-root {
          position: absolute;
          right: ${theme.spacing(3.2)};

          .MuiBadge-standard {
            background: ${theme.colors.primary.main};
            font-size: ${theme.typography.pxToRem(10)};
            font-weight: bold;
            //text-transform: uppercase;
            };
          }
        }
    
        .MuiButton-root {
          display: flex;
          color: ${theme.colors.alpha.trueWhite[70]};
          background-color: transparent;
          width: 100%;
          justify-content: flex-start;
          padding: ${theme.spacing(1.2, 3)};

          .MuiButton-startIcon,
          .MuiButton-endIcon {
            transition: ${theme.transitions.create(['color'])};

            .MuiSvgIcon-root {
              font-size: inherit;
              transition: none;
            }
          }

          .MuiButton-startIcon {
            font-size: ${theme.typography.pxToRem(20)};
            margin-right: ${theme.spacing(1)};
          }
          
          .MuiButton-endIcon {
            margin-left: auto;
            opacity: .8;
            font-size: ${theme.typography.pxToRem(20)};
          }

          &.active,
          &:hover {
            background-color: ${alpha(theme.colors.alpha.trueWhite[100], 0.06)};
            color: ${theme.colors.alpha.trueWhite[100]};

            .MuiButton-startIcon,
            .MuiButton-endIcon {
              color: ${theme.colors.alpha.trueWhite[100]};
            }
          }
        }

        &.Mui-children {
          flex-direction: column;

          .MuiBadge-root {
            position: absolute;
            right: ${theme.spacing(7)};
          }
        }

        .MuiCollapse-root {
          width: 100%;

          .MuiList-root {
            padding: ${theme.spacing(1, 0)};
          }

          .MuiListItem-root {
            padding: 1px 0;

            .MuiButton-root {
              padding: ${theme.spacing(0.8, 3)};

              .MuiBadge-root {
                right: ${theme.spacing(3.2)};
              }

              &:before {
                content: ' ';
                background: ${theme.colors.alpha.trueWhite[100]};
                opacity: 0;
                transition: ${theme.transitions.create([
                  'transform',
                  'opacity'
                ])};
                width: 6px;
                height: 6px;
                transform: scale(0);
                transform-origin: center;
                border-radius: 20px;
                margin-right: ${theme.spacing(1.8)};
              }

              &.active,
              &:hover {

                &:before {
                  transform: scale(1);
                  opacity: 1;
                }
              }
            }
          }
        }
      }
    }
`
);

export const MenuSection: FC<Props> = ({ section }) => {
  const { user } = useSelector(selectAuth);

  if (
    section.allowedRoles &&
    user?.role.name &&
    !section.allowedRoles.includes(user.role.name as ValidRoles)
  ) {
    return null;
  }

  return (
    <List
      component='div'
      subheader={
        <Typography color='text.secondary' variant='subtitle2' sx={{ pl: 3 }}>
          {section.title}
        </Typography>
      }
    >
      <SubMenuWrapper>
        <List component='div'>
          {section.items.map((item, index) =>
            item.subItems ? (
              <NavItemCollapsable key={index} navItem={item} />
            ) : (
              <NavItemButton key={index} item={item} />
            )
          )}
        </List>
      </SubMenuWrapper>
    </List>
  );
};
