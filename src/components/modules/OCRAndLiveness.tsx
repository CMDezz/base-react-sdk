/* eslint-disable @typescript-eslint/no-unused-vars */
import Result from '../Result';
import Face from '../Face';
import OCRBack from '../OCRBack';
import OCRFront from '../OCRFront';
import { useState } from 'preact/hooks';
import useOcrRequest from '@sdk/hooks/useOcrRequest';
import { DOC_SIDE, ENUM_STEPS } from '@sdk/utils/constant';
import useStepBySignal from './useStepBySignal';
import LoadingContainer from '@shared/components/Loading/LoadingContainer';
import useLivenessRequest from '@sdk/hooks/useLivenessRequest';

type OCRAndLivenessStep = 'FRONT' | 'BACK' | 'FACE' | 'RESULT';

interface BackCaptureData {
  image: string;
  info: string;
}

interface ScannedData {
  front?: string;
  back?: BackCaptureData;
}

interface Props {
  lastMessage: WsResponse | null;
  context: SDKContext;
  mockingSignals: (message: WsResponse) => void;
  sessionId: string;
}

const ContainerSkeleton = () => {
  return (
    <div className="w-full h-full">
      <span className="skeleton skeleton-text mt-3">
        Getting ready for steps
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
const OCRAndLiveness = (props: Props) => {
  const { currentStep, loading, nextStep } = useStepBySignal({
    lastMessage: props.lastMessage,
  });

  const [step, setStep] = useState<OCRAndLivenessStep>('FRONT');
  const [scannedData, setScannedData] = useState<ScannedData>({});
  const { requestOcr } = useOcrRequest();
  const { requestLiveness } = useLivenessRequest();

  const handleFrontCapture = () => {
    // Simulate front capture logic
    setScannedData((prev: ScannedData) => ({
      ...prev,
      front: 'Front Image Data',
    }));
    // setStep('BACK');

    nextStep(() => {
      const emptyImage = new File([], 'test', {});
      //dont need to await
      requestOcr(
        props.sessionId,
        DOC_SIDE.FRONT, //docSide,
        emptyImage
      );

      //setimeout a fake signal
      setTimeout(() => {
        props.mockingSignals({
          session_id: 'sess_y1k2298nsil',
          status: '',
          reconnected: false,
          current_step: ENUM_STEPS.DOC_BACK,
          completed_steps: [ENUM_STEPS.DOC_FONT],
        });
      }, 1000);
    });
  };

  const handleBackCapture = (data: BackCaptureData) => {
    setScannedData((prev: ScannedData) => ({ ...prev, back: data }));

    nextStep(() => {
      const emptyImage = new File([], 'test', {});
      //dont need to await
      requestOcr(
        props.sessionId,
        DOC_SIDE.BACK, //docSide,
        emptyImage
      );

      //setimeout a fake signal
      setTimeout(() => {
        props.mockingSignals({
          session_id: 'sess_y1k2298nsil',
          status: '',
          reconnected: false,
          current_step: ENUM_STEPS.LIVENESS,
          completed_steps: [ENUM_STEPS.DOC_FONT, ENUM_STEPS.DOC_BACK],
        });
      }, 1000);
    });
  };

  const handleRestart = () => {
    setScannedData({});
    // setStep('FRONT');
  };
  const dataURLtoFile = (dataUrl: string, filename: string): File => {
    // 1. Split the string to get the mime type and the base64 data
    const arr = dataUrl.split(',');
    const mimeMatch = arr[0].match(/:(.*?);/);
    const mime = mimeMatch ? mimeMatch[1] : 'image/jpeg';

    // 2. Decode the base64 string
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    // 3. Create and return the File object
    return new File([u8arr], filename, { type: mime });
  };
  const handleFaceCapture = ({ images }: { images: string[] }) => {
    setScannedData((prev: ScannedData) => ({ ...prev, face: { images } }));

    nextStep(() => {
      const fileImages = images.map((base64Img, i) => {
        return dataURLtoFile(base64Img, `test-${i}.jpg`);
      });
      //dont need to await
      requestLiveness(props.sessionId, fileImages);

      //setimeout a fake signal
      setTimeout(() => {
        props.mockingSignals({
          session_id: 'sess_y1k2298nsil',
          status: '',
          reconnected: false,
          current_step: ENUM_STEPS.RESULT,
          completed_steps: [
            ENUM_STEPS.DOC_FONT,
            ENUM_STEPS.DOC_BACK,
            ENUM_STEPS.LIVENESS,
          ],
        });
      }, 1000);
    });
    // setStep('RESULT');
  };

  const renderByStep = () => {
    switch (currentStep) {
      case ENUM_STEPS.DOC_FONT:
        return <OCRFront onCapture={handleFrontCapture} />;
      case ENUM_STEPS.DOC_BACK:
        return (
          <OCRBack
            onCapture={handleBackCapture}
            onBack={() => setStep('FRONT')}
          />
        );
      case ENUM_STEPS.LIVENESS:
        return (
          <Face
            onCapture={(images) => {
              handleFaceCapture(images);
            }}
            onBack={() => setStep('BACK')}
          />
        );
      case ENUM_STEPS.RESULT:
        return <Result data={scannedData} onRestart={handleRestart} />;
      default:
        return <ContainerSkeleton />;
    }
  };

  return (
    <div className="sdk-container min-w-75 min-h-75 ">
      <LoadingContainer isLoading={loading}>{renderByStep()}</LoadingContainer>
      {/* 
      {step === 'FRONT' && <OCRFront onCapture={handleFrontCapture} />}

      {step === 'BACK' && (
        <OCRBack
          onCapture={handleBackCapture}
          onBack={() => setStep('FRONT')}
        />
      )}

      {step === 'FACE' && (
        <Face
          onCapture={(image) => {
            setScannedData((prev: ScannedData) => ({ ...prev, face: image }));
            setStep('RESULT');
          }}
          onBack={() => setStep('BACK')}
        />
      )}

      {step === 'RESULT' && (
        <Result data={scannedData} onRestart={handleRestart} />
      )} */}
    </div>
  );
};

export default OCRAndLiveness;
