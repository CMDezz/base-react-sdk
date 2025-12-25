import FaceMatching from './modules/FaceMatching';
import Liveness from './modules/Liveness';
import OCRAndLiveness from './modules/OCRAndLiveness';
import { useSocketConnection } from '@sdk/hooks/useWebsocket';

interface Props {
  context: SDKContext;
  sessionId: string | null;
}

const SDKStepControl = ({ context, sessionId }: Props) => {
  //CONNECT WS
  const { lastMessage, mockingSignals } = useSocketConnection(sessionId || '');
  return (
    <>
      {context.config.module.FaceMatching && (
        <FaceMatching lastMessage={lastMessage} context={context} />
      )}
      {context.config.module.OCRAndLiveness && (
        <OCRAndLiveness
          mockingSignals={mockingSignals}
          lastMessage={lastMessage}
          context={context}
          sessionId={sessionId || ''}
        />
      )}
      {context.config.module.Liveness && (
        <Liveness lastMessage={lastMessage} context={context} />
      )}
    </>
  );
};

export default SDKStepControl;
