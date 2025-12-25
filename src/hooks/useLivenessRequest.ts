import { publicApi } from '@sdk/api';
import { useState } from 'preact/hooks';

const useLivenessRequest = () => {
  const [loading, setLoading] = useState(false);

  const requestLiveness = async (sessionId: string, image: File[]) => {
    setLoading(true);
    return await publicApi
      .sessionLiveness(sessionId, image)
      .then((res) => {
        console.log('--res ', res);
      })
      .catch((err) => {
        console.log('-err ', err);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return {
    loading,
    requestLiveness,
  };
};

export default useLivenessRequest;
