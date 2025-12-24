import Button from '@shared/components/base/Button';
import { useRef } from 'react';
import VideoStream from './base/VideoStream';
import { FaCamera } from 'react-icons/fa';

const OCRFront = ({ onCapture }: { onCapture: () => void }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <div className="sdk-view-front">
      <h3>Scan Front Side</h3>
      <div
        className="m-auto w-full bg-gray-400 aspect-video"
        style={{ margin: '1rem 0' }}
      >
        <VideoStream videoRefProps={videoRef.current!} />
      </div>
      <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
        <Button onClick={onCapture} size={'lg'}>
          <FaCamera size={24} color="white" /> Capture
        </Button>
      </div>
    </div>
  );
};

export default OCRFront;
