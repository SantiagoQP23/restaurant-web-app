import { MouseEvent, useState } from 'react';

import { ExpandMore } from '@mui/icons-material';
import { Button, Typography, Menu, MenuItem } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectMenu,
  setActiveCategory,
  setActiveSection
} from '../../../../redux';

export const ProductSortBySection = () => {
  const [open, setOpen] = useState<Element | null>(null);

  const dispatch = useDispatch();

  const { activeSection, sections } = useSelector(selectMenu);

  const handleOpen = (event: MouseEvent<HTMLButtonElement>) => {
    setOpen(event.currentTarget);
  };

  const changeSection = (sectionId: string) => {
    const section = sections.find((s) => s.id === sectionId);
    dispatch(setActiveSection(section!));

    dispatch(setActiveCategory(section!.categories[0]));
    handleClose();
  };

  const handleClose = () => {
    setOpen(null);
  };

  return (
    <>
      <Button
        color='inherit'
        disableRipple
        onClick={(e) => handleOpen(e)}
        endIcon={<ExpandMore fontSize='small' sx={{ ml: -0.5 }} />}
      >
        Sección:&nbsp;
        <Typography
          component='span'
          variant='subtitle2'
          sx={{ color: 'text.secondary' }}
        >
          {activeSection?.name}
        </Typography>
      </Button>
      <Menu
        keepMounted
        anchorEl={open}
        open={Boolean(open)}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        {sections.map((section) => (
          <MenuItem
            key={section.id}
            selected={section.id === activeSection?.id}
            onClick={() => changeSection(section.id)}
            sx={{ typography: 'body2' }}
          >
            {section.name}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};
