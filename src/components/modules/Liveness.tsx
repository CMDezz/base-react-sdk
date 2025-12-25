import Result from "../Result";
import Face from "../Face";
import { useState } from "preact/hooks";

interface BackCaptureData {
  image: string;
  info: string;
}

type LivenessStep = "FACE" | "RESULT"
interface ScannedData {
  front?: string;
  back?: BackCaptureData;
}

const Liveness = () => {
  const [step, setStep] = useState<LivenessStep>('FACE');
  const [scannedData, setScannedData] = useState<ScannedData>({});

  const handleRestart = () => {
    setScannedData({});
    setStep('FACE');
  };

  const handleFaceCapture = (image : string) => {
    setScannedData((prev: ScannedData) => ({ ...prev, 'face': image}));
    setStep('RESULT');
  };

  return (
    <div className="sdk-container min-w-75 min-h-75 ">
      {step === 'FACE' && (
        <Face
          onCapture={handleFaceCapture}
        />
      )}

      {step === 'RESULT' && (
        <Result data={scannedData} onRestart={handleRestart} />
      )}
    </div>
  );
};

export default Liveness;
