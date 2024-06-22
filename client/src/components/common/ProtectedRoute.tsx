import { useCheckAuth } from '@/hooks';
import { PropsWithChildren } from 'react';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }: PropsWithChildren) {
  const { isAuth } = useCheckAuth();

  return isAuth ? children : <Navigate to="/login" />;
}
