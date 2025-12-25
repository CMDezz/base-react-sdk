import { useState } from "react";
import Result from "../Result";
import Face from "../Face";
import OCRBack from "../OCRBack";
import OCRFront from "../OCRFront";

type OCRAndLivenessStep = 'FRONT' | 'BACK' | 'FACE' | 'RESULT';

interface BackCaptureData {
  image: string;
  info: string;
}

interface ScannedData {
  front?: string;
  back?: BackCaptureData;
}

const OCRAndLiveness = () => {
  const [step, setStep] = useState<OCRAndLivenessStep>('FRONT');
  const [scannedData, setScannedData] = useState<ScannedData>({});

  const handleFrontCapture = () => {
    // Simulate front capture logic
    setScannedData((prev: ScannedData) => ({ ...prev, front: 'Front Image Data' }));
    setStep('BACK');
  };

  const handleBackCapture = (data: BackCaptureData) => {
    setScannedData((prev: ScannedData) => ({ ...prev, back: data }));
    setStep('FACE');
  };

  const handleRestart = () => {
    setScannedData({});
    setStep('FRONT');
  };

  return (
    <div className="sdk-container min-w-75 min-h-75 ">
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
            setScannedData((prev: ScannedData) => ({ ...prev, 'face': image}));
            setStep('RESULT');
          }}
          onBack={() => setStep('BACK')}
        />
      )}

      {step === 'RESULT' && (
        <Result data={scannedData} onRestart={handleRestart} />
      )}
    </div>
  );
};

export default OCRAndLiveness;
