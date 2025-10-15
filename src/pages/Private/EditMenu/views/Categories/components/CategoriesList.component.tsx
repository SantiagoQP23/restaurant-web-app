import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// Material UI
import {
  Box,
  Grid,
  MenuItem,
  Select,
  SelectChangeEvent,
  FormControl,
  InputLabel
} from '@mui/material/';

// Component
import { Category } from './Category.component';

import { ICategory } from '../../../../../../models/menu.model';

import { selectMenu, setActiveSection } from '../../../../../../redux';

export function CategoriesList() {
  const { sections, activeSection, categories } = useSelector(selectMenu);

  const [filteredCategories, setFilteredCategories] =
    useState<ICategory[]>(categories);

  const dispatch = useDispatch();

  const handleChangeSection = (event: SelectChangeEvent) => {
    const value = event.target.value;

    if (value === '') {
      setFilteredCategories(categories);
      dispatch(setActiveSection(null));
      return;
    }

    const section = sections.find((section) => section.id === value);
    if (section) {
      dispatch(setActiveSection(section));
      setFilteredCategories(getCategoriesBySection(section.id));
    }
  };

  const getCategoriesBySection = (sectionId: string) => {
    return categories.filter((c) => c.section.id === sectionId);
  };

  const setCategories = () => {
    if (activeSection) {
      const categories = getCategoriesBySection(activeSection.id);
      setFilteredCategories(categories);
    } else {
      setFilteredCategories(categories);
    }
  };

  useEffect(() => {
    setCategories();
  }, []);

  useEffect(() => {
    setCategories();
  }, [categories]);

  return (
    <>
      <Grid container display='flex' justifyContent='space-between'>
        <Grid item display='flex' alignItems='center'>
          <FormControl sx={{ minWidth: 120 }} size='small'>
            <InputLabel id='demo-select-small-label'>Sección</InputLabel>
            <Select
              labelId='demo-select-small-label'
              id='demo-select-small'
              value={activeSection?.id || ''}
              label='Estado'
              onChange={handleChangeSection}
            >
              <MenuItem value=''>
                <em>Todos</em>
              </MenuItem>
              {sections.map((seccion) => (
                <MenuItem key={seccion!.id} value={seccion.id!}>
                  {seccion.name}{' '}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <Box mt={2}>
        <Grid container rowSpacing={1} spacing={1}>
          {filteredCategories.length > 0 &&
            filteredCategories.map((categoria) => (
              <Grid key={categoria.id} item xs={12} sm={4} lg={3}>
                <Category categoria={categoria} />
              </Grid>
            ))}
        </Grid>
      </Box>
    </>
  );
}
