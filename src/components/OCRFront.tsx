import { useRef } from 'preact/hooks';
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
        <VideoStream videoRef={videoRef} />
      </div>
      <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
        <button onClick={onCapture} className={'btn btn-lg'}>
          <FaCamera size={24} color="white" /> Capture
        </button>
      </div>
    </div>
  );
};

export default OCRFront;
