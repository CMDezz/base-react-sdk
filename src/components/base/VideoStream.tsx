import { webcamService } from '@sdk/service/WebcamService';
import { useEffect, useRef } from 'react';

const VideoStream = ({
  videoRefProps,
  className,
}: {
  videoRefProps: HTMLVideoElement;
  className?: string;
}) => {
  const videoRef = useRef<HTMLVideoElement>(videoRefProps);

  useEffect(() => {
    if (videoRef.current) {
      webcamService.stopVideo();
    }
    const startWebcam = async () => {
      await webcamService.startVideo(videoRef.current);
    };
    startWebcam();
  }, []);

  return (
    <video
      ref={videoRef}
      autoPlay
      className={`w-full h-full object-cover ${className}`}
      playsInline
      muted
    />
  );
};

export default VideoStream;
