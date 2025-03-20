import { ExpandMore } from '@mui/icons-material';
import { Button, Typography, Menu, MenuItem } from '@mui/material';
import { useState, MouseEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectMenu, setActiveCategory } from '../../../../redux';
import { ICategory } from '../../../../models';

export const ProductSortByCategory = () => {
  const [open, setOpen] = useState<Element | null>(null);

  const dispatch = useDispatch();

  const { activeSection, activeCategory } = useSelector(selectMenu);

  const handleOpen = (event: MouseEvent<HTMLButtonElement>) => {
    setOpen(event.currentTarget);
  };

  const changeCategory = (category: ICategory) => {
    dispatch(setActiveCategory(category));
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
        Categoría:&nbsp;
        <Typography
          component='span'
          variant='subtitle2'
          sx={{ color: 'text.secondary' }}
        >
          {activeCategory?.name}
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
        {activeSection?.categories.map((category) => (
          <MenuItem
            key={category.id}
            selected={category.id === activeCategory?.id}
            onClick={() => changeCategory(category)}
            sx={{ typography: 'body2' }}
          >
            {category.name}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};
