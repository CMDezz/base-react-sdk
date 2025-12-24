import { useRef } from 'react';
import { FaArrowLeft, FaCamera } from 'react-icons/fa';
import { webcamService } from '@sdk/service/WebcamService';
import Button from '@shared/components/base/Button';
import VideoStream from './base/VideoStream';

function Face({
  onCapture,
  onBack,
}: {
  onCapture: () => void;
  onBack?: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleFaceCapture = () => {
    onCapture();
    webcamService.stopVideo();
  };

  return (
    <>
      <div className="w-full">
        <h3>Face Search</h3>
        <div
          className="m-auto w-full bg-gray-400 aspect-video"
          style={{ margin: '1rem 0' }}
        >
          <VideoStream videoRefProps={videoRef.current!} />
        </div>
      </div>
      <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
        <Button
          size={'lg'}
          onClick={() => {
            webcamService.stopVideo();
            if (onBack) onBack();
          }}
        >
          <FaArrowLeft size={24} color="white" />
          Back
        </Button>
        <Button onClick={handleFaceCapture} size={'lg'}>
          <FaCamera size={24} color="white" /> Capture
        </Button>
      </div>
    </>
  );
}

export default Face;
