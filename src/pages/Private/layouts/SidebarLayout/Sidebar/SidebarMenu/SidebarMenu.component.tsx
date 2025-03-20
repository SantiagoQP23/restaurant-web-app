import { Box, styled } from '@mui/material';

import { MenuSection } from './MenuSection.component';
import { menuSections } from '../../data/MenuData';

const MenuWrapper = styled(Box)(
  ({ theme }) => `
  .MuiList-root {
    padding: ${theme.spacing(1)};

    & > .MuiList-root {
      padding: 0 ${theme.spacing(0)} ${theme.spacing(1)};
    }
  }

  .MuiListSubheader-root {
    text-transform: uppercase;
    font-weight: bold;
    font-size: ${theme.typography.pxToRem(12)};
    color: ${theme.colors.alpha.trueWhite[50]};
    padding: ${theme.spacing(0, 2.5)};
    line-height: 1.4;
  }
`
);

function SidebarMenu() {
  return (
    <>
      <MenuWrapper>
        {menuSections.map((section, index) => (
          <MenuSection section={section} key={index} />
        ))}
      </MenuWrapper>
    </>
  );
}

export default SidebarMenu;
