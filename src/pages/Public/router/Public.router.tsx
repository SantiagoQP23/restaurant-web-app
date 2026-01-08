import { Navigate, RouteObject } from 'react-router-dom';
import { Shop } from '../Shop/Shop.page';
import { Login } from '../Auth/Login';
import { Signup } from '../Auth/Signup';
import { ProductsMenu } from '../Shop/views/ProductsMenu/ProductsMenu.view';
import { Product } from '../Shop/views/Product/Product.page';
import { Home } from '../Home/Home.page';
import { ForgotPassword } from '../Auth/ForgotPassword';
import ResetPassword from '../Auth/ResetPassword/ResetPassword.page';

export const PublicRouter: RouteObject[] = [
  {
    path: '',
    children: [
      { path: '', element: <Home /> },
      {
        path: 'shop',
        element: <Shop />,
        children: [
          {
            path: '',
            element: <ProductsMenu />
          },
          {
            path: 'product/:id',
            element: <Product />
          },
          {
            path: '*',
            element: <Navigate to='' />
          }
        ]
      }
    ]
  },
  {
    path: 'auth',
    children: [
      {
        path: 'login',
        element: <Login />
      },
      {
        path: 'register',
        element: <Signup />
      },
      {
        path: 'forgot-password',
        element: <ForgotPassword />
      },
      {
        path: 'reset-password/:token',
        element: <ResetPassword />
      }
    ]
  },
  {
    path: '*',
    element: <Navigate to='/' />
  }
];
