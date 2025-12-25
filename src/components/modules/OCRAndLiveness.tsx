import Result from '../Result';
import Face from '../Face';
import OCRBack from '../OCRBack';
import OCRFront from '../OCRFront';
import OCRSelector from '../OCRSelector';
import { useState } from 'preact/hooks';
import { DEFAULT_THEME_CONFIG } from '@sdk/utils/config';

type RefObject<T> = { current: T | null };

type OCRAndLivenessStep = 'SELECT' | 'FRONT' | 'BACK' | 'FACE' | 'RESULT';

interface ScannedData {
  front?: string;
  back?: string;
}

const OCRAndLiveness = () => {
  const [step, setStep] = useState<OCRAndLivenessStep>('SELECT');
  const [scannedData, setScannedData] = useState<ScannedData>({});
  const [option, setOption] = useState('');

  const handleFrontCapture = (image: string) => {
    setScannedData((prev: ScannedData) => ({
      ...prev,
      front: image,
    }));
    setStep('BACK');
  };

  const handleBackCapture = (image: string) => {
    setScannedData((prev: ScannedData) => ({ ...prev, back: image }));
    setStep('FACE');
  };

  const handleRestart = () => {
    setScannedData({});
    setStep('FRONT');
  };

  const handleOCRSelection = (option: string) => {
    setOption(option);
    setStep('FRONT');
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
      {step === 'SELECT' && (
        <OCRSelector onSelection={(option) => handleOCRSelection(option)} />
      )}
      {step === 'FRONT' && (
        <OCRFront
          option={option}
          onCapture={handleFrontCapture}
          drawTrackingFrame={drawTrackingFrame}
        />
      )}
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
      )}
    </div>
  );
};

export default OCRAndLiveness;
