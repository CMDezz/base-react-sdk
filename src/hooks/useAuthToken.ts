import { publicApi } from '@sdk/api';
import { useEffect } from 'preact/hooks';

const useAuthToken = (API_KEY: string) => {
  const getAuthToken = async () => {
    const res = await publicApi.authToken(API_KEY);
    console.log('res ', res);
  };
  useEffect(() => {
    getAuthToken();
  }, []);
};

export default useAuthToken;
