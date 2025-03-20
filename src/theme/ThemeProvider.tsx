import React, { useState } from 'react';
import { ThemeProvider } from '@mui/material';
import { themeCreator } from './base';
// import { StylesProvider } from '@mui/styles';
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';

export const ThemeContext = React.createContext(
  (themeName: string): void => {}
);

interface Props {
  children: ReactJSXElement;
}

const ThemeProviderWrapper: React.FC<Props> = (props) => {
  const curThemeName = localStorage.getItem('appTheme') || 'PureLightTheme';

  const [themeName, _setThemeName] = useState(curThemeName);

  const theme = themeCreator(themeName);

  const setThemeName = (themeName: string): void => {
    localStorage.setItem('appTheme', themeName);
    _setThemeName(themeName);
  };

  return (
    <ThemeContext.Provider value={setThemeName}>
      <ThemeProvider theme={theme}>{props.children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeProviderWrapper;
