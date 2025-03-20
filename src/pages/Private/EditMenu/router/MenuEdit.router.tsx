import { lazy } from 'react';

import { Navigate, RouteObject } from 'react-router-dom';

import { EditCategory, ProductsList } from '../components';
import { EditProduct, Products, CreateProduct } from '../views/Products/';
import { Sections } from '../views/Sections/Sections.view';
import { Categories } from '../views/Categories/Categories.view';

const EditMenu = lazy(() => import('../EditMenu.page'));

export const MenuEditRouter: RouteObject = {
  path: 'menu',
  element: <EditMenu />,
  children: [
    {
      path: '',
      element: <Navigate to={'sections'} />
    },
    {
      path: 'sections',
      element: <Sections />
    },
    {
      path: 'categories',
      element: <Categories />
    },
    {
      path: 'products',
      element: <Products />
    },
    {
      path: 'products/:id',
      element: <>vista producto</>
      // loader: productLoader(queryClient)
    },
    {
      path: 'products/:id/edit',
      element: <EditProduct />
    },
    {
      path: 'products/create',
      element: <CreateProduct />
    },
    // {
    //   path: "seccion",
    //   element: <EditSection />,
    // },
    // {
    //   path: ":nameSection",
    //   element: <EditCategories />,
    // },
    {
      path: 'category',
      element: <EditCategory />
    },
    {
      path: ':nameSection/:nameCategory',
      element: <ProductsList />
    },
    {
      path: 'product',
      element: <EditProduct />
    },
    {
      path: '*',
      element: <Navigate to={'sections'} />
    }
  ]
};
