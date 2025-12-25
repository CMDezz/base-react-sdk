import { webcamService } from '@sdk/service/WebcamService';
// import button from '@shared/components/base/button';
import { useEffect, useRef, useState } from 'preact/hooks';
import { FaArrowLeft } from 'react-icons/fa';
import VideoStream from './base/VideoStream';
import FaceDetectorManager from '@sdk/service/FaceDetectorService';

function Face({
  // onCapture,
  onBack,
  onCapture,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onCapture: (data: any) => void;
  onBack?: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const faceDetectorRef = useRef<FaceDetectorManager | null>(null);
  const [isFaceInFrame, setIsFaceInFrame] = useState<boolean | null>(null);
  const timerRef = useRef<number | null>(null);
  const capturedRef = useRef<boolean>(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    if (!canvas || !video) return;

    const detector = new FaceDetectorManager();
    faceDetectorRef.current = detector;
    let mounted = true;

    const startDetection = () => {
      detector.startDetection(video, (_detection, inFrame) => {
        if (!mounted) return;
        setIsFaceInFrame(inFrame);
      });
    };

    const init = async () => {
      const ok = await detector.initialize(canvas);
      if (!ok) return;

      if (video.readyState >= 2) {
        startDetection();
      } else {
        video.addEventListener('loadedmetadata', startDetection, {
          once: true,
        });
      }
    };

    init();

    return () => {
      mounted = false;
      detector.stopDetection();
      webcamService.stopVideo();
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      capturedRef.current = false; // Reset for potential re-mount
    };
  }, []);

  // Timer effect: capture after 3 seconds of face in frame
  useEffect(() => {
    if (capturedRef.current) return; // Don't capture again if already captured

    if (isFaceInFrame === true) {
      // Start or continue the 3-second timer for burst capture of 5 images
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      timerRef.current = window.setTimeout(async () => {
        if (videoRef.current && !capturedRef.current) {
          const video = videoRef.current;
          const images: string[] = [];
          const canvas = document.createElement('canvas');
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          const ctx = canvas.getContext('2d');

          if (ctx) {
            for (let i = 0; i < 5; i++) {
              ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
              const imageData = canvas.toDataURL('image/jpeg');
              images.push(imageData);
              if (i < 4) {
                // Don't delay after last image
                await new Promise((res) => setTimeout(res, 600)); // Take one every 600ms, for 5 in 3s
              }
            }
            capturedRef.current = true;
            onCapture({ images });
          }
        }
      }, 3000); // Wait 3 seconds, then take 5 burst shots over 3 seconds
    } else {
      // Reset timer if face is not in frame
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [isFaceInFrame, onCapture]);

  return (
    <>
      <div className="w-full">
        <h3>Face Search</h3>
        <div
          className="m-auto w-full bg-gray-900 aspect-video relative overflow-hidden"
          style={{ margin: '1rem 0' }}
        >
          <VideoStream videoRef={videoRef} />
          <canvas
            ref={canvasRef}
            className="absolute inset-0 pointer-events-none w-full h-full"
          />
        </div>
        <div className="text-center my-2 text-sm">
          {isFaceInFrame === null && 'Align your face within the frame.'}
          {isFaceInFrame === false && 'Move closer and center your face.'}
          {isFaceInFrame === true && 'Great! Hold still to capture.'}
        </div>
      </div>
      <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
        {onBack && (
          <button
            className={'btn btn-lg'}
            // size={'lg'}
            onClick={() => {
              webcamService.stopVideo();
            }}
          >
            <FaArrowLeft size={24} color="white" />
            Back
          </button>
        )}
      </div>
    </>
  );
}

export default Face;
