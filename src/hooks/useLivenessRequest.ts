import { publicApi } from '@sdk/api';
import { DOC_SIDE } from '@sdk/utils/constant';
import { useState } from 'preact/hooks';

const useLivenessRequest = () => {
  const [loading, setLoading] = useState(false);

  const requestLiveness = async (
    sessionId: string,
    docSide: DOC_SIDE,
    image: File[]
  ) => {
    setLoading(true);
    return await publicApi
      .sessionLiveness(docSide, sessionId, image)
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
