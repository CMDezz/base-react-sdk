import { useRef, useEffect } from 'react';
import { FaCamera } from 'react-icons/fa';
import { webcamService } from '@sdk/service/WebcamService';
import Button from '@shared/components/base/Button';

function Face({
  onCapture,
  onBack,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onCapture: (data: any) => void;
  onBack: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      webcamService.stopVideo();
    }
    const startWebcam = async () => {
      await webcamService.startVideo(videoRef.current);
    };
    startWebcam();
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleFaceCapture = (data: any) => {
    onCapture(data);
  };

  return (
    <>
      <div className="w-full">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          Face Search
        </h3>
        <div className="m-auto w-full bg-gray-400 aspect-video rounded-lg">
          <video
            ref={videoRef}
            autoPlay
            className="w-full h-full rounded-lg object-cover"
            playsInline
            muted
          />
        </div>
      </div>
      <div className="mt-6 flex justify-center gap-3">
        <Button
          onClick={() => {
            webcamService.stopVideo();
            onBack();
          }}
        >
          Back
        </Button>
        <Button
          className="bg-green-600 cursor-pointer"
          onClick={handleFaceCapture}
        >
          <FaCamera size={24} color="white" /> Capture
        </Button>
      </div>
    </>
  );
}

export default Face;
