import Button from '@shared/components/base/Button';
import { useRef } from 'react';
import VideoStream from './base/VideoStream';
import { FaArrowLeft, FaCamera } from 'react-icons/fa';
// import { Input } from '@shared/components/ui/input';

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onCapture: (data: any) => void;
  onBack: () => void;
}

function OCRBack({ onCapture, onBack }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleCapture = () => {
    // Mock capture data
    onCapture({
      image: 'back_img_base64',
      info: 'Back side info',
    });
  };

  return (
    <div className="sdk-view-back">
      <h3>Scan Back Side</h3>
      <div
        className="m-auto w-full bg-gray-400 aspect-video"
        style={{ margin: '1rem 0' }}
      >
        <VideoStream videoRef={videoRef} />
      </div>
      <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
        <Button
          size={'lg'}
          onClick={onBack}
        >
          <FaArrowLeft size={24} color="white" />
          Back
        </Button>
        <Button onClick={handleCapture} size={'lg'}>
          <FaCamera size={24} color="white" /> Capture
        </Button>
      </div>
    </div>
  );
}

export default OCRBack;
