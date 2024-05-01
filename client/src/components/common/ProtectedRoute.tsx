import { useAuth } from '@/hooks';
import { PropsWithChildren } from 'react';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }: PropsWithChildren) {
  const { isAuth } = useAuth();

  return isAuth ? children : <Navigate to="/login" />;
}
