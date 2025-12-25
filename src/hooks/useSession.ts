import { publicApi } from '@sdk/api';
import { VERIFY_MODE } from '@sdk/utils/constant';
import { useEffect, useMemo, useState } from 'preact/hooks';

const useSession = (
  // memberRef: unknow,
  // userContext: unknow,
  module: ModuleConfig
) => {
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
  const [sessionId, setSessionId] = useState<string | null>(null);

  const getSession = async (mode: VERIFY_MODE) => {
    const res = await publicApi.session(mode);
    console.log('res', res);
    if (res.data.sessionId) {
      console.log(res.data.sessionId);
      setSessionId(res.data.sessionId);
    }
    // if (res.)
  };
  useEffect(() => {
    if (!mode) {
      return console.error('No mode was selected');
    }
    getSession(mode);
  }, [mode]);
  return {
    sessionId,
  };
};

export default useSession;
