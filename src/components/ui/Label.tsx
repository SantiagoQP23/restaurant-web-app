import { FC, ReactNode } from 'react';
import { styled } from '@mui/material/styles';

interface LabelProps {
  className?: string;
  color?: 'primary' | 'secondary' | 'error' | 'warning' | 'success' | 'info';
  children?: ReactNode;
  sx?: any;
}

const LabelWrapper = styled('span')(
  ({ theme }) => `
      background-color: ${theme.colors.alpha.black[5]};
      padding: ${theme.spacing(0.5, 1)};
      font-size: ${theme.typography.pxToRem(11)};
      font-weight: ${theme.typography.fontWeightBold};
      border-radius: ${theme.general.borderRadius};
      display: inline-flex;
      align-items: center;
      justify-content: center;
      max-height: ${theme.spacing(3)};
      
      &.MuiLabel {
        &-primary {
          background-color: ${theme.colors.primary.lighter};
          color: ${theme.palette.primary.main}
        }
        
        &-secondary {
          background-color: ${theme.colors.secondary.lighter};
          color: ${theme.palette.secondary.main}
        }
        
        &-success {
          background-color: ${theme.colors.success.lighter};
          color: ${theme.palette.success.main}
        }
        
        &-warning {
          background-color: ${theme.colors.warning.lighter};
          color: ${theme.palette.warning.main}
        }
              
        &-error {
          background-color: ${theme.colors.error.lighter};
          color: ${theme.palette.error.main}
        }
        
        &-info {
          background-color: ${theme.colors.info.lighter};
          color: ${theme.palette.info.main}
        }
      }
`
);

export const Label: FC<LabelProps> = ({
  className = '',
  color = 'secondary',
  children,
  sx,
  ...rest
}) => {
  return (
    <LabelWrapper className={'MuiLabel-' + color} {...rest} sx={sx}>
      {children}
    </LabelWrapper>
  );
};
