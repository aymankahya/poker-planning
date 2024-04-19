import Layout from '@/layouts/Layout';
import { Home } from '@/pages';
import Login from '@/pages/Login/Login';
import SignUp from '@/pages/Sign Up/SignUp';
import { pathConstants } from '@/routes/pathConstants';
import { createBrowserRouter } from 'react-router-dom';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: pathConstants.ABOUT,
        element: <h1>What is Poker Planning ?</h1>,
      },
      {
        path: pathConstants.FEATURES,
        element: <h1>Features</h1>,
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/sign-up',
    element: <SignUp />,
  },
]);
