import { useEffect, useRef } from 'preact/hooks';
import VideoStream from './base/VideoStream';
import { FaCamera } from 'react-icons/fa';
// import { Input } from '@shared/components/ui/input';

type RefObject<T> = { current: T | null };

interface Props {
  onCapture: (image: string) => void;
  // onBack: () => void;
  drawTrackingFrame: (canvasRef: RefObject<HTMLCanvasElement>) => void;
}

const OCRBack = ({
  onCapture,
  //  onBack,
  drawTrackingFrame,
}: Props) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Trigger drawing when component mounts or window resizes
  useEffect(() => {
    const handleResize = () => {
      drawTrackingFrame(canvasRef);
    };

    drawTrackingFrame(canvasRef);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [drawTrackingFrame]);

  const handleCapture = () => {
    if (videoRef.current) {
      const video = videoRef.current;
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');

      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imageData = canvas.toDataURL('image/jpeg');
        onCapture(imageData);
      }
    }
  };

  return (
    <div className="sdk-view-back">
      <h3>Scan Back Side</h3>
      <div
        className="relative m-auto w-full bg-gray-400 aspect-video"
        style={{ margin: '1rem 0', position: 'relative' }}
      >
        <VideoStream videoRef={videoRef} />
        <canvas
          ref={canvasRef}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none', // Allows clicks to pass through to buttons if needed
          }}
        />
      </div>
      <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
        {/* <button className={'btn btn-lg'} onClick={onBack}>
          <FaArrowLeft size={18} />
          Back
        </button> */}
        <button onClick={handleCapture} className="btn btn-lg btn-primary">
          <FaCamera size={18} color="white" /> Capture
        </button>
      </div>
    </div>
  );
};

export default OCRBack;
