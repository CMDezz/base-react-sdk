/* eslint-disable @typescript-eslint/no-unused-vars */
import { FaCamera } from 'react-icons/fa';
import { webcamService } from '@sdk/service/WebcamService';
// import button from '@shared/components/base/button';
import { useEffect, useRef } from 'preact/hooks';

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
        <button
          className="btn"
          onClick={() => {
            webcamService.stopVideo();
            onBack();
          }}
        >
          Back
        </button>
        <button className=" btn btn-success" onClick={handleFaceCapture}>
          <FaCamera size={24} color="white" /> Capture
        </button>
      </div>
    </>
  );
}

export default Face;
