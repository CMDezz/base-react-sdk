import { webcamService } from '@sdk/service/WebcamService';
import { RefObject } from 'preact';
import { useEffect } from 'preact/hooks';

type VideoStreamProps = {
  videoRef: RefObject<HTMLVideoElement>;
  className?: string;
};

const VideoStream = ({ videoRef, className }: VideoStreamProps) => {
  useEffect(() => {
    const element = videoRef && videoRef.current;
    if (!element) return;

    const startWebcam = async () => {
      await webcamService.startVideo(element);
    };

    startWebcam();

    return () => {
      webcamService.stopVideo();
    };
  }, [videoRef]);

  return (
    <video
      ref={videoRef}
      autoPlay
      className={`w-full h-full object-cover ${className || ''}`}
      playsInline
      muted
      style={{
        transform: 'scaleX(-1)',
        WebkitTransform: 'scaleX(-1)',
        MozTransform: 'scaleX(-1)',
      }}
    />
  );
};

export default VideoStream;
