import { publicApi } from '@sdk/api';
import { useEffect, useState } from 'preact/hooks';

const useAuthToken = (API_KEY: string) => {
  const [loading, setLoading] = useState(false);
  const getAuthToken = async () => {
    setLoading(true);
    return await publicApi
      .authToken(API_KEY)
      .then((res) => {
        console.log('getAuthToken ', res);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    getAuthToken();
  }, []);

  return {
    loading: loading,
  };
};

export default useAuthToken;
