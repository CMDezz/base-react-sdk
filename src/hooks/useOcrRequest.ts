import { publicApi } from '@sdk/api';
import { DOC_SIDE } from '@sdk/utils/constant';
import { useState } from 'preact/hooks';

const useOcrRequest = () => {
  const [loading, setLoading] = useState(false);

  const requestOcr = async (
    sessionId: string,
    docSide: DOC_SIDE,
    image: File
  ) => {
    setLoading(true);
    return await publicApi
      .sessionDocuments(docSide, sessionId, image)
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
    requestOcr,
  };
};

export default useOcrRequest;
