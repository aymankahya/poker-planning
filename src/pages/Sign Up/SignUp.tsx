import { Spinner } from '@/components/ui/spinner';
import { useAuth } from '@/hooks';
import AuthLayout from '@/layouts/AuthLayout';
import SignUpForm from '@/pages/Sign Up/components/SignUpForm';
import { Navigate } from 'react-router-dom';

export default function SignUp() {
  const { user, isAuth, authLoading } = useAuth();
  return isAuth && user?.role === 'user' ? (
    <Navigate to="/" />
  ) : (
    <AuthLayout>{authLoading ? <Spinner size="large" /> : <SignUpForm />}</AuthLayout>
  );
}
