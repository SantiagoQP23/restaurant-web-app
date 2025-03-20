import { FC, useState, useEffect } from 'react';

import { Box, Grid, Typography } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { InputSearch } from '../../../../../components/ui';
import { IProduct, ICategory } from '../../../../../models';
import {
  selectMenu,
  setActiveCategory,
  setActiveSection
} from '../../../../../redux';

import { findProductsByName, getProducts } from '../../../../../helpers';
// import { useModal } from '../../../../../hooks';
// import { ICreateOrderDetail } from '../../../../../models/orders.model';

import { ProductListAddToOrder } from './MenuAddProduct/ProductListAddToOrder.component';

interface Props {
  categories: ICategory[];
}

export const Categories: FC<Props> = ({ categories }) => {
  const { activeCategory } = useSelector(selectMenu);

  const dispatch = useDispatch();

  const changeCategory = (category: ICategory) => {
    dispatch(setActiveCategory(category));
  };

  if (!activeCategory) {
    return (
      <Typography variant='body1' textAlign='center'>
        Seleccione una sección
      </Typography>
    );
  }

  return (
    <>
      <Box
        sx={{ display: 'flex', overflowX: 'auto', gap: 2 }}
        alignItems='center'
      >
        {' '}
        {categories.map((category) => {
          if (category.isActive)
            return (
              <Box
                // variant={activeCategory.id === category.id ? "contained" : "outlined"}
                key={category.id}
                sx={{
                  border: '1px solid',
                  borderRadius: 2,
                  borderColor: 'primary.main',

                  color:
                    activeCategory.id === category.id
                      ? 'white'
                      : 'primary.main',
                  backgroundColor:
                    activeCategory.id === category.id
                      ? 'primary.main'
                      : 'white',

                  p: 1,

                  '&:hover': {
                    backgroundColor: 'primary.main',
                    color: 'white',
                    cursor: 'pointer'
                  }
                }}
                onClick={() => changeCategory(category)}
                textAlign='center'
              >
                <Typography variant='h5' textAlign='center'>
                  {category.name}
                </Typography>
              </Box>
            );
        })}
      </Box>
    </>
  );
};

const AllMenu: FC = () => {
  const { activeCategory } = useSelector(selectMenu);

  // const { isOpen, handleClose, handleOpen } = useModal();

  // const [detail, setDetail] = useState<ICreateOrderDetail | null>(null);

  // const newDetail = (detail: ICreateOrderDetail) => {
  //   setDetail(detail);
  //   handleOpen();
  // };

  return (
    <>
      <Grid container xs={12} spacing={2}>
        {/* <Grid item xs={12}>
          <Sections sections={sections} />
        </Grid>

        <Grid item xs={12}>
          {activeSection && (
            <Categories categories={activeSection?.categories} />
          )}
        </Grid> */}

        <Grid item xs={12}>
          {activeCategory && (
            <ProductListAddToOrder products={activeCategory.products} />
          )}
        </Grid>
      </Grid>
    </>
  );
};

export const MenuAddProduct = () => {
  const { sections } = useSelector(selectMenu);

  const [nameProduct, setNameProduct] = useState('');

  const [products, setProducts] = useState<IProduct[]>([]);

  const ListProducts = getProducts(sections);

  const dispatch = useDispatch();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNameProduct(event.target.value);

    setProducts(findProductsByName(event.target.value, ListProducts));
  };

  const searchProduct = () => {
    setProducts(findProductsByName(nameProduct, ListProducts));
  };

  useEffect(() => {
    dispatch(setActiveSection(sections[0]));
    dispatch(setActiveCategory(sections[0].categories[0]));
  }, []);

  return (
    <>
      <Grid
        container
        spacing={1}
        sx={{ display: 'flex', alignItems: 'center', mb: 1 }}
      >
        <Grid item xs={12} mb={1}>
          <InputSearch
            handleChange={handleChange}
            search={searchProduct}
            placeholder={'Nombre del producto'}
            value={nameProduct}
            reset={() => setNameProduct('')}
          />
        </Grid>
        <Grid item xs={12} mb={1}>
          {nameProduct.length > 0 ? (
            <ProductListAddToOrder products={products} />
          ) : (
            <AllMenu />
          )}
        </Grid>
      </Grid>
    </>
  );
};
