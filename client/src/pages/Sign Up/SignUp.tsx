import { Spinner } from '@/components/ui/spinner';
import { useCheckAuth } from '@/hooks';
import AuthLayout from '@/layouts/AuthLayout';
import SignUpForm from '@/pages/Sign Up/components/SignUpForm';
import { Navigate } from 'react-router-dom';

export default function SignUp() {
  const { isAuth, authLoading } = useCheckAuth();
  return isAuth ? (
    <Navigate to="/" />
  ) : (
    <AuthLayout>{authLoading ? <Spinner size="large" /> : <SignUpForm />}</AuthLayout>
  );
}
