/* eslint-disable @typescript-eslint/no-explicit-any */
import { SDKError } from '@sdk/utils/errors';
import SDKErrorFallback from './SDKErrorFallback';
import { Toaster } from 'sonner';
import { createPortal, useMemo } from 'preact/compat';
import FaceMatching from './modules/FaceMatching';
import Liveness from './modules/Liveness';
import OCRAndLiveness from './modules/OCRAndLiveness';
import useAuthToken from '@sdk/hooks/useAuthToken';
// import useSession from '@sdk/hooks/useSession';
// import useOcrRequest from '@sdk/hooks/useOcrRequest';
// import useLivenessRequest from '@sdk/hooks/useLivenessRequest';
// import { VERIFY_MODE } from '@sdk/utils/constant';

interface Props {
  context: SDKContext;
  err?: SDKError;
}

function SDKContent({ context, err }: Props) {
  useAuthToken(context.config.core.API_KEY);
  // const { sessionId } = useSession(VERIFY_MODE.LIVENESS);
  // console.log('sessionId ', sessionId);
  // const { loading, requestOcr } = useOcrRequest();
  // const {
  //   // loading,
  //   requestLiveness,
  // } = useLivenessRequest();

  // console.log('--loading ', loading);

  if (err) {
    //handle error
    return <SDKErrorFallback context={context} err={err} />;
  }

  const memorizedToast = useMemo(() => {
    return createPortal(<Toaster position="top-center" />, document.body);
  }, []);

  return (
    <div className="sdk-container min-w-75 min-h-75">
      {context.config.module.FaceMatching && <FaceMatching />}
      {context.config.module.OCRAndLiveness && <OCRAndLiveness />}
      {context.config.module.Liveness && <Liveness />}
      {/* <Toaster position="top-center" /> */}
      {memorizedToast}
    </div>
  );
}

export default SDKContent;
