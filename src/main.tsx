// import React from 'react';
import ReactDOM from 'react-dom/client';
import '@/styles/global.css';
import AuthContextProvider from '@/context/AuthProvider';
import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-wrap-balancer';
import { router } from '@/routes/router';
import SettingContextProvider from '@/context/SettingProvider';

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <AuthContextProvider>
    <SettingContextProvider>
      <RouterProvider router={router} />
      <Provider />
    </SettingContextProvider>
  </AuthContextProvider>,
  // </React.StrictMode>,
);
