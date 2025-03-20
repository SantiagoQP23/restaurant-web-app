import { FC, useState } from 'react';
import { ICategory } from '../../../../models/menu.model';
import { Box, Button, Grid } from '@mui/material';

interface Props {
  categories: ICategory[];
}

export const Categories: FC<Props> = ({ categories }) => {
  const [category, setCategory] = useState<ICategory>(categories[0]);

  return (
    <>
      <Box sx={{ display: 'flex' }}>
        {categories.map((category, index) => (
          /*  <Box key={category.id} sx={{border: 1, p: 2 , borderRadius: 2, mr: 3}}>
 
               {category.name}
               
               </Box> */
          <Button
            variant='outlined'
            key={category.id}
            sx={{
              mr: 3,
              mb: 3,
              '&:hover': {
                backgroundColor: 'primary.main',
                color: 'white'
              }
            }}
          >
            {category.name}
          </Button>
        ))}
      </Box>
    </>
  );
};
