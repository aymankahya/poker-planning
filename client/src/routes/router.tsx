import { Layout, SessionLayout } from '@/layouts';
import { Home, Login, SignUp } from '@/pages';
import ProtectedRoute from '@/components/common/ProtectedRoute';
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
        element: (
          <ProtectedRoute>
            <h1>What is Poker Planning ?</h1>
          </ProtectedRoute>
        ),
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
  {
    path: '/session/:id',
    element: <SessionLayout />,
  },
]);
