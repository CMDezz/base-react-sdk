/* eslint-disable @typescript-eslint/no-unused-vars */
import { publicApi } from '@sdk/api';
import { VERIFY_MODE } from '@sdk/utils/constant';
import { useEffect, useMemo, useState } from 'preact/hooks';

const useSession = (
  // memberRef: unknow,
  // userContext: unknow,
  module: ModuleConfig
) => {
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const mode = useMemo<VERIFY_MODE | undefined>(() => {
    if (module.FaceMatching) {
      return VERIFY_MODE.FaceMatching;
    }
    if (module.Liveness) {
      return VERIFY_MODE.LIVENESS;
    }
    if (module.OCRAndLiveness) {
      return VERIFY_MODE.OCR_LIVENESS;
    }
  }, [module.FaceMatching, module.Liveness, module.OCRAndLiveness]);

  const getSession = async (mode: VERIFY_MODE) => {
    setLoading(true);

    await publicApi
      .session(mode)
      .then((res) => {
        if (res.data.sessionId) {
          console.log(res.data.sessionId);
          setSessionId(res.data.sessionId);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (mode == undefined) {
      return console.error('No mode was selected');
    }

    getSession(mode);
  }, [mode]);

  return {
    sessionId: sessionId,
    loading: loading,
  };
};

export default useSession;
