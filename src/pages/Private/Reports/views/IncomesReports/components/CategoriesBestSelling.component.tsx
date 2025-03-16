import { Print } from '@mui/icons-material';
import {
  Button,
  Card,
  CardHeader,
  List,
  ListItem,
  ListItemText,
  Box
} from '@mui/material';
import { QueryObserverResult, UseQueryResult } from '@tanstack/react-query';
import { Bar, Pie } from 'react-chartjs-2';
import { BestSellingCategoriesResponse } from '../../../services/dashboard.service';
import { FC } from 'react';
import { generateRandomColor } from '../../../../Common/helpers/randomColor.helpert';

interface Props {
  categoriesQuery: UseQueryResult<BestSellingCategoriesResponse, unknown>;
}

export const CategoriesBestSelling: FC<Props> = ({ categoriesQuery }) => {
  const data = {
    labels: categoriesQuery.data?.categories.map(
      (category) => category.categoryName
    ),
    datasets: [
      {
        label: 'Cantidad Vendida',
        data: categoriesQuery.data?.categories.map((category) =>
          Number(category.totalSold)
        ),
        backgroundColor: categoriesQuery.data?.categories.map((category) =>
          generateRandomColor()
        ),
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }
    ]
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        display: false
      }
    },

    plugins: {
      legend: {
        position: 'right' as const
      }
    }
  };

  return (
    <Card>
      <CardHeader
        title='Categorias mas vendidas'

        // action={
        //   <Button
        //     size='small'
        //     variant='contained'
        //     startIcon={<Print />}
        //   >
        //     Imprimir
        //   </Button>
        // }
      />
      {categoriesQuery.data && (
        <Box
          sx={{
            height: 300,
            width: 400,
            mx: 'auto',
            my: 'auto',
            p: 2,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Pie data={data} options={options} />
        </Box>
      )}

      <List>
        {categoriesQuery.data?.categories.map((category) => (
          <ListItem>
            <ListItemText
              primary={category.categoryName}
              secondary={`Cantidad: ${category.totalSold}`}
            />
          </ListItem>
        ))}

        {/* <ListItem>
          <ListItemText primary='Categoria 2' secondary='Cantidad: 10' />
        </ListItem>
        <ListItem>
          <ListItemText primary='Categoria 3' secondary='Cantidad: 10' />
        </ListItem> */}
      </List>
    </Card>
  );
};
