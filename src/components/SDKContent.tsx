/* eslint-disable @typescript-eslint/no-explicit-any */
import { SDKError } from '@sdk/utils/errors';
import SDKErrorFallback from './SDKErrorFallback';
import OCRBack from './OCRBack';
import Result from './Result';
import Face from './Face';
import { useMemo, useState } from 'preact/hooks';
import { createPortal } from 'preact/compat';
import { Toaster } from 'sonner';
import useAuthToken from '@sdk/hooks/useAuthToken';
import useSession from '@sdk/hooks/useSession';
import { DOC_SIDE, VERIFY_MODE } from '@sdk/utils/constant';
import useOcrRequest from '@sdk/hooks/useOcrRequest';
import useLivenessRequest from '@sdk/hooks/useLivenessRequest';

interface Props {
  context: SDKContext;
  err?: SDKError;
}

type SDKStep = 'FRONT' | 'BACK' | 'FACE' | 'RESULT';

function SDKContent({ context, err }: Props) {
  useAuthToken(context.config.core.API_KEY);
  const { sessionId } = useSession(VERIFY_MODE.LIVENESS);
  console.log('sessionId ', sessionId);
  const { loading, requestOcr } = useOcrRequest();
  const {
    // loading,
    requestLiveness,
  } = useLivenessRequest();

  console.log('--loading ', loading);
  const [step, setStep] = useState<SDKStep>('FRONT');
  const [scannedData, setScannedData] = useState<any>({});

  if (err) {
    //handle error
    return <SDKErrorFallback context={context} err={err} />;
  }

  const handleFrontCapture = () => {
    // Simulate front capture logic
    setScannedData((prev: any) => ({ ...prev, front: 'Front Image Data' }));
    setStep('BACK');
  };

  const handleBackCapture = (data: any) => {
    setScannedData((prev: any) => ({ ...prev, back: data }));
    setStep('FACE');
  };

  const handleRestart = () => {
    setScannedData({});
    setStep('FRONT');
  };

  const memorizedToast = useMemo(() => {
    return createPortal(<Toaster position="top-center" />, document.body);
  }, []);

  return (
    <div className="sdk-container min-w-75 min-h-75 ">
      <button
        className="btn"
        onClick={() => {
          //test
          requestOcr(
            '123',
            DOC_SIDE.BACK,
            new File([], 'test.png', {
              type: 'image/png',
            })
          );
        }}
      >
        Mock Ocr
      </button>
      <button
        className="btn"
        onClick={() => {
          //test
          requestLiveness(
            '123',
            DOC_SIDE.BACK,
            [1, 2, 3, 4, 5].map((i) => {
              return new File([], `test-${i}.png`, {
                type: 'image/png',
              });
            })
          );
        }}
      >
        Mock Liveness
      </button>
      {step === 'FRONT' && (
        <div className="sdk-view-front">
          <h3>Scan Front Side</h3>
          <div
            style={{
              height: 200,
              background: '#eee',
              margin: '1rem 0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <p>Front Camera Previewzasdfasdasd</p>
          </div>
          <button className="btn" onClick={handleFrontCapture}>
            Capture Front
          </button>
        </div>
      )}

      {step === 'BACK' && (
        <OCRBack
          onCapture={handleBackCapture}
          onBack={() => setStep('FRONT')}
        />
      )}

      {step === 'FACE' && (
        <Face
          onCapture={(data) => {
            setScannedData((prev: any) => ({ ...prev, face: data }));
            setStep('RESULT');
          }}
          onBack={() => setStep('BACK')}
        />
      )}

      {step === 'RESULT' && (
        <Result data={scannedData} onRestart={handleRestart} />
      )}
      {/* <Toaster position="top-center" /> */}
      {memorizedToast}
    </div>
  );
}

export default SDKContent;
