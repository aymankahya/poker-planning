import { Spinner } from '@/components/ui/spinner';
import AlertBox from '@/components/common/AlertBox';
import { useCheckAuth, useLogin } from '@/hooks';
import AuthLayout from '@/layouts/AuthLayout';
import LoginForm from '@/pages/Login/components/LoginForm';
import { Navigate } from 'react-router-dom';

export default function Login() {
  const { loading, error, login } = useLogin();
  const { isAuth, authLoading } = useCheckAuth();
  return isAuth ? (
    <Navigate to="/" />
  ) : (
    <AuthLayout>
      {error && <AlertBox title="Incorrect Credentials" description={error.errorMessage} />}
      {authLoading ? <Spinner size="large" /> : <LoginForm login={login} loading={loading} />}
    </AuthLayout>
  );
}
