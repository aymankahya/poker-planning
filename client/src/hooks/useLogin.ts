import useAuth from '@/hooks/useAuth';
import { LoginFormFields } from '@/pages/Login/components/LoginForm';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

type LoginError = {
  isError: boolean;
  errorMessage: string;
};

export default function useLogin() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<LoginError | null>(null);
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const login = async (data: LoginFormFields) => {
    setError(null);
    setLoading(true);
    const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ email: data.email, password: data.password }),
    });

    if (response.ok) {
      const jsonRes = await response.json();

      setLoading(false);
      // Store the token in localStorage
      localStorage.setItem('token', jsonRes.token);
      // Store the active user in context

      setUser({ username: jsonRes.user.username });
      localStorage.setItem('user', JSON.stringify({ username: jsonRes.user.username }));
      // Redirect the user to homepage
      navigate('/');
    }

    if (response.status === 401) {
      setLoading(false);
      setError({ isError: true, errorMessage: 'Incorrect password ! Have another go' });
    }
    if (response.status === 404) {
      setLoading(false);
      setError({
        isError: true,
        errorMessage: 'No account found with that email ! Please check your email or consider signing up.',
      });
    }
  };

  return { loading, error, login };
}