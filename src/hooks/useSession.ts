import { publicApi } from '@sdk/api';
import { VERIFY_MODE } from '@sdk/utils/constant';
import { useEffect, useState } from 'preact/hooks';

const useSession = (
  // memberRef: unknow,
  // userContext: unknow,
  mode: VERIFY_MODE
) => {
  const [sessionId, setSessionId] = useState<string | null>(null);

  const getSession = async () => {
    const res = await publicApi.session(mode);
    console.log('res', res);
    if (res.data.sessionId) {
      console.log(res.data.sessionId);
      setSessionId(res.data.sessionId);
    }
    // if (res.)
  };
  useEffect(() => {
    getSession();
  }, []);
  return {
    sessionId,
  };
};

export default useSession;
