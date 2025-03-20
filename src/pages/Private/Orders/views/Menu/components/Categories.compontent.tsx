import { FC } from 'react';
import { ICategory } from '../../../../../../models/menu.model';
import { Typography, Stack, Chip } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectMenu,
  setActiveCategory
} from '../../../../../../redux/slices/menu/menu.slice';

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
      <Stack
        direction='row'
        sx={{
          width: 'auto',
          overflowX: 'auto'
        }}
        spacing={1}
        pb={1}
      >
        {categories.map((category, index) => {
          if (category.isActive)
            return (
              <Chip
                label={category.name}
                key={category.id}
                variant={
                  activeCategory.id === category.id ? 'filled' : 'outlined'
                }
                onClick={() => changeCategory(category)}
                color={activeCategory.id === category.id ? 'info' : 'default'}
                clickable
              />
            );
        })}
      </Stack>

      {/* <Box sx={{ display: 'flex', flexDirection: {xs: 'column', md: 'row'} }}> */}

      {/* <Card>


        <Box sx={{ display: 'flex', overflowX: 'auto', p: 1 }}>
          {
            categories.map((category, index) => {

              if (category.isActive)
                return (


                  <Button
                    variant={activeCategory.id === category.id ? "contained" : "outlined"}
                    key={category.id}
                    sx={{
                      mr: 3,

                      '&:hover': {
                        backgroundColor: 'primary.main',
                        color: 'white'
                      },
                      px: 2,
                    }}
                    onClick={() => changeCategory(category)}

                  >
                    {category.name}
                  </Button>
                )
            }
            )

          }

        </Box>
      </Card> */}
    </>
  );
};
