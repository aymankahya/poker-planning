import { useEffect, useState } from 'react';

export default function useCheckAuth() {
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [authLoading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const checkAuth = async () => {
      const jwt = localStorage.getItem('token');

      if (!jwt) {
        setLoading(false);
        localStorage.removeItem('user');
        return setIsAuth(false);
      }

      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/auth`, {
        method: 'POST',
        headers: {
          Authorization: jwt,
        },
      });

      if (!response.ok) {
        setLoading(false);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        return setIsAuth(false);
      }

      setLoading(false);
      return setIsAuth(true);
    };

    checkAuth();
  }, []);

  return { isAuth, authLoading };
}
