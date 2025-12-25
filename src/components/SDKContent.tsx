/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { SDKError } from '@sdk/utils/errors';
import SDKErrorFallback from './SDKErrorFallback';
import { Toaster } from 'sonner';
import { createPortal, useMemo } from 'preact/compat';
import useAuthToken from '@sdk/hooks/useAuthToken';
import SDKStepControl from './SDKStepControl';
import useSession from '@sdk/hooks/useSession';
// import LoadingContainer from '@shared/components/Loading/LoadingContainer';

interface Props {
  context: SDKContext;
  err?: SDKError;
}

const ContainerSkeleton = () => {
  return (
    <div className="w-full h-full">
      <span className="skeleton skeleton-text mt-3">
        Getting ready for verify Ekyc
      </span>

      <div className="flex w-full flex-col gap-4 mt-4">
        <div className="skeleton h-4 w-full"></div>
        <div className="skeleton h-50 w-full"></div>
        <div className="skeleton h-4 w-full"></div>
        <div className="skeleton h-4 w-full"></div>
      </div>
    </div>
  );
};

function SDKContent({ context, err }: Props) {
  if (err) {
    //handle error
    return <SDKErrorFallback context={context} err={err} />;
  }

  // generate auth token
  const { loading: tokenLoading } = useAuthToken(context.config.core.API_KEY);
  //generate sessionId -> should based on user context
  const { sessionId, loading: sessionLoading } = useSession(
    context.config.module
  );

  const memorizedToast = useMemo(() => {
    return createPortal(<Toaster position="top-center" />, document.body);
  }, []);

  return (
    <div className="sdk-container min-w-75 min-h-75">
      {sessionLoading || tokenLoading ? (
        <ContainerSkeleton />
      ) : (
        <SDKStepControl context={context} sessionId={sessionId} />
      )}
      {memorizedToast}
    </div>
  );
}

export default SDKContent;
