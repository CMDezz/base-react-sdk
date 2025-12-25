/* eslint-disable @typescript-eslint/no-explicit-any */
import useApiKey from '../hooks/useApiKey';
import { SDKError } from '@sdk/utils/errors';
import SDKErrorFallback from './SDKErrorFallback';
import { Toaster } from 'sonner';
import { createPortal, useMemo } from 'preact/compat';
import FaceMatching from './modules/FaceMatching';
import Liveness from './modules/Liveness';
import OCRAndLiveness from './modules/OCRAndLiveness';

interface Props {
  context: SDKContext;
  err?: SDKError;
}

function SDKContent({ context, err }: Props) {
  const { API_KEY } = useApiKey({
    API_KEY: context.config.core.API_KEY,
  });
  console.log('API_KEY ', API_KEY);

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
