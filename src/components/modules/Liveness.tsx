import Result from '../Result';
import Face from '../Face';
import { useState } from 'preact/hooks';

interface BackCaptureData {
  image: string;
  info: string;
}

type LivenessStep = 'FACE' | 'RESULT';
interface ScannedData {
  front?: string;
  back?: BackCaptureData;
}
interface Props {
  lastMessage: WsResponse | null;
  context: SDKContext;
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Liveness = (props: Props) => {
  const [step, setStep] = useState<LivenessStep>('FACE');
  const [scannedData, setScannedData] = useState<ScannedData>({});

  const handleRestart = () => {
    setScannedData({});
    setStep('FACE');
  };

  const handleFaceCapture = (image: string) => {
    setScannedData((prev: ScannedData) => ({ ...prev, face: image }));
    setStep('RESULT');
  };

  return (
    <div className="sdk-container min-w-75 min-h-75 flex items-center">
      {step === 'FACE' && <Face onCapture={handleFaceCapture} />}

      {step === 'RESULT' && (
        <Result data={scannedData} onRestart={handleRestart} />
      )}
    </div>
  );
};

export default Liveness;
