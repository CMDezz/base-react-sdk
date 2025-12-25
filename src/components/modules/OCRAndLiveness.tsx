import Result from '../Result';
import Face from '../Face';
import OCRBack from '../OCRBack';
import OCRFront from '../OCRFront';
import OCRSelector from '../OCRSelector';
import { DEFAULT_THEME_CONFIG } from '@sdk/utils/config';
import { useState } from 'preact/hooks';
import useOcrRequest from '@sdk/hooks/useOcrRequest';
import { DOC_SIDE, ENUM_STEPS } from '@sdk/utils/constant';
import useStepBySignal from './useStepBySignal';
import LoadingContainer from '@shared/components/Loading/LoadingContainer';
import useLivenessRequest from '@sdk/hooks/useLivenessRequest';

type RefObject<T> = { current: T | null };

// type OCRAndLivenessStep = 'SELECT' | 'FRONT' | 'BACK' | 'FACE' | 'RESULT';

interface ScannedData {
  front?: string;
  back?: string;
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
  const { currentStep, loading, nextStep, setCurrentStep } = useStepBySignal({
    lastMessage: props.lastMessage,
  });
  const [option, setOption] = useState('');

  // const [step, setStep] = useState<OCRAndLivenessStep>('FRONT');
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

  const handleBackCapture = (data: string) => {
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
      case ENUM_STEPS.SELECT:
        return (
          <OCRSelector onSelection={(option) => handleOCRSelection(option)} />
        );

      case ENUM_STEPS.DOC_FONT:
        return (
          <OCRFront
            option={option}
            onCapture={handleFrontCapture}
            drawTrackingFrame={drawTrackingFrame}
          />
        );
      case ENUM_STEPS.DOC_BACK:
        return (
          <OCRBack
            drawTrackingFrame={drawTrackingFrame}
            onCapture={handleBackCapture}
            // onBack={() => setStep('FRONT')}
          />
        );
      case ENUM_STEPS.LIVENESS:
        return (
          <Face
            onCapture={(images) => {
              handleFaceCapture(images);
            }}
            // onBack={() => setStep('BACK')}
          />
        );
      case ENUM_STEPS.RESULT:
        return <Result data={scannedData} onRestart={handleRestart} />;
      default:
        return <ContainerSkeleton />;
    }
  };

  const handleOCRSelection = (option: string) => {
    setOption(option);
    // setStep('FRONT');
    setCurrentStep(ENUM_STEPS.DOC_FONT);
  };

  const drawTrackingFrame = (canvasRef: RefObject<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set internal canvas resolution to match its displayed size
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const displayWidth = canvas.width;
    const displayHeight = canvas.height;

    const cardAspectRatio = 85.6 / 53.98;
    const padding = 0.07;

    let frameWidth = displayWidth * (1 - 2 * padding);
    let frameHeight = frameWidth / cardAspectRatio;

    if (frameHeight > displayHeight * (1 - 2 * padding)) {
      frameHeight = displayHeight * (1 - 2 * padding);
      frameWidth = frameHeight * cardAspectRatio;
    }

    const x = (displayWidth - frameWidth) / 2;
    const y = (displayHeight - frameHeight) / 2;

    ctx.clearRect(0, 0, displayWidth, displayHeight); // Clear previous frames
    ctx.save();
    ctx.strokeStyle = DEFAULT_THEME_CONFIG.colors.primary;
    ctx.lineWidth = 2;
    // ctx.setLineDash([8, 10]);
    ctx.strokeRect(x, y, frameWidth, frameHeight);
    ctx.restore();
  };

  return (
    <div className="sdk-container min-w-75 min-h-75 ">
      <LoadingContainer isLoading={loading}>{renderByStep()}</LoadingContainer>
      {/* 
      {step === 'FRONT' && <OCRFront onCapture={handleFrontCapture} />}

      {step === 'BACK' && (
        <OCRBack
          drawTrackingFrame={drawTrackingFrame}
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
