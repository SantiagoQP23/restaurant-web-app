import { FC } from 'react';

// @mui
import { styled } from '@mui/material/styles';
import { Badge } from '@mui/material';
import { ShoppingCartOutlined } from '@mui/icons-material';

// component

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  zIndex: 999,
  right: 0,
  display: 'flex',
  cursor: 'pointer',
  position: 'fixed',
  alignItems: 'center',
  top: theme.spacing(13),
  height: theme.spacing(5),
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  paddingTop: theme.spacing(1.25),

  color: theme.palette.text.primary,
  backgroundColor: theme.palette.background.paper,
  borderTopLeftRadius: Number(theme.shape.borderRadius) * 2,
  borderBottomLeftRadius: Number(theme.shape.borderRadius) * 2,
  transition: theme.transitions.create('opacity'),
  '&:hover': { opacity: 0.72 }
}));

// ----------------------------------------------------------------------

interface Props {
  onClick?: () => void;
  badge: number;
}

export const CartWidget: FC<Props> = ({ onClick, badge }) => {
  return (
    <StyledRoot
      onClick={() => {
        onClick && onClick();
      }}
    >
      <Badge showZero badgeContent={badge} color='error' max={99}>
        <ShoppingCartOutlined />
      </Badge>
    </StyledRoot>
  );
};
