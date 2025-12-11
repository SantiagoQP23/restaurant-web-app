import { FC, ReactNode } from 'react';

import { Scrollbars } from 'react-custom-scrollbars-2';

import { Box, useTheme } from '@mui/material';

interface ScrollbarProps {
  className?: string;
  children?: ReactNode;
  height?: number | string;
  autoHeight?: boolean;
}

export const Scrollbar: FC<ScrollbarProps> = ({
  className,
  children,
  height,
  autoHeight = false,
  ...rest
}) => {
  const theme = useTheme();

  return (
    <Scrollbars
      style={{ width: '100%', height }}
      autoHeight={autoHeight}
      autoHide
      renderThumbVertical={() => {
        return (
          <Box
            sx={{
              width: 5,
              height: 5,
              background: `${theme.colors.alpha.black[10]}`,
              borderRadius: `${theme.general.borderRadiusLg}`,
              transition: `${theme.transitions.create(['background'])}`,

              '&:hover': {
                background: `${theme.colors.alpha.black[30]}`
              }
            }}
          />
        );
      }}
      renderThumbHorizontal={() => {
        return (
          <Box
            sx={{
              width: 5,
              height: 5,
              background: `${theme.colors.alpha.black[10]}`,
              borderRadius: `${theme.general.borderRadiusLg}`,
              // animation fade
              transition: `${
                (theme.transitions.create(['background']),
                {
                  duration: 100
                })
              }`,
              '&:hover': {
                background: `${theme.colors.alpha.black[30]}`
              },
              animation: `fadeIn 100ms`
            }}
          />
        );
      }}
      renderTrackHorizontal={() => {
        return (
          <Box
            sx={{
              position: 'absolute',
              height: 5,
              width: '100%',
              bottom: 0,
              left: 0,
              borderRadius: `${theme.general.borderRadiusLg}`,
              background: `${theme.colors.alpha.black[10]}`
            }}
          />
        );
      }}
      {...rest}
    >
      {children}
    </Scrollbars>
  );
};

