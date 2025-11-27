import { useState, useEffect, FC } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// Material UI
import {
  Typography,
  Grid,
  FormControl,
  Box,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  ListSubheader
} from '@mui/material/';

import { IProduct } from '../../../../../../models';
import { Product } from './Product.component';

import { selectMenu, setActiveCategory } from '../../../../../../redux';

interface Props {}

export const ProductsList: FC<Props> = () => {
  const dispatch = useDispatch();

  const { activeCategory, products, sections, categories } =
    useSelector(selectMenu);

  const [filteredProducts, setFilteredProducts] =
    useState<IProduct[]>(products);

  const changeCategory = (e: SelectChangeEvent) => {
    const categoryId = e.target.value;

    if (categoryId === '') {
      setFilteredProducts(products);
      dispatch(setActiveCategory(null));
      return;
    }

    const category = categories.find((s) => s.id === categoryId);
    if (!category) return;

    const filteredProducts = findProductsByCategory(categoryId);
    setFilteredProducts(filteredProducts);
    dispatch(setActiveCategory(category));
  };

  const findProductsByCategory = (categoryId: string) => {
    return products.filter((product) => product.category.id === categoryId);
  };

  const setProducts = () => {
    if (activeCategory) {
      const products = findProductsByCategory(activeCategory.id);
      setFilteredProducts(products);
    } else setFilteredProducts(products);
  };

  useEffect(() => {
    setProducts();
  }, [products]);

  useEffect(() => {
    setProducts();
  }, []);

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        {/* {activeCategory && (
          <Button variant="text" sx={{ mr: 1 }}>
            Reordenar
          </Button>
        )} */}

        <FormControl sx={{ width: 200 }}>
          <InputLabel id='select-categoria'>Categoria</InputLabel>
          <Select
            id='grouped-select'
            label='Categoría'
            labelId='select-categoria'
            margin='dense'
            fullWidth
            value={activeCategory?.id || ''}
            onChange={changeCategory}
            size='small'
          >
            <MenuItem value=''>
              <em>Todos</em>
            </MenuItem>
            {sections.map((section) => [
              <ListSubheader
                key={section.id}
                sx={{
                  fontWeight: 'bold'
                }}
              >
                {section.name}
              </ListSubheader>,

              ...section.categories.map((category) => (
                <MenuItem key={category.id} value={category.id} sx={{ pl: 3 }}>
                  {category.name}
                </MenuItem>
              ))
            ])}
          </Select>
        </FormControl>
      </Box>

      <Box mt={2} mb={4}>
        <Grid container rowSpacing={1} spacing={1}>
          {filteredProducts.length === 0 && (
            <Typography align='center' variant='subtitle1'>
              No se han registrado productos
            </Typography>
          )}

          {filteredProducts.length > 0 &&
            filteredProducts.map((producto) => (
              <Grid key={producto.id!} item xs={12} sm={6} lg={3}>
                <Product producto={producto} />
              </Grid>
            ))}
        </Grid>
      </Box>
    </>
  );
};
