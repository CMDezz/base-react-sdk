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

  // Calculate progress percentage (0-100) for the 3-second countdown
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    if (isFaceInFrame === true && !capturedRef.current) {
      const startTime = Date.now();
      const interval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min((elapsed / 3000) * 100, 100);
        setCountdown(progress);

        if (progress >= 100) {
          clearInterval(interval);
        }
      }, 50);

      return () => clearInterval(interval);
    } else {
      setCountdown(0);
    }
  }, [isFaceInFrame]);

  const getStatusMessage = () => {
    if (isFaceInFrame === false) {
      return {
        text: 'Move closer and center your face',
        icon: '📷',
        color: 'text-warning',
      };
    }
    return {
      text: `Hold still... ${Math.ceil((100 - countdown) / 33.33)}s`,
      icon: '✨',
      color: 'text-success',
    };
  };

  const status = getStatusMessage();

  return (
    <>
      <div className="w-full">
        <div className="text-center mb-4">
          <h3 className="text-2xl font-bold mb-2 text-primary">
            Face Verification
          </h3>
          <p className="text-sm text-gray-600">
            Position your face in the center of the frame
          </p>
        </div>

        <div
          className="relative m-auto w-full aspect-video rounded-2xl overflow-hidden shadow-2xl bg-gray-900"
          style={{ margin: '1rem 0' }}
        >
          <VideoStream videoRef={videoRef} />
          <canvas
            ref={canvasRef}
            className="absolute inset-0 pointer-events-none w-full h-full"
          />

          {/* Face detection overlay frame */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="relative w-64 h-80 rounded-2xl transition-all duration-300 shadow-[0_0_0_9999px_rgba(0,0,0,0.5)]"></div>
          </div>
        </div>

        <p className="text-base-content text-base text-center font-semibold">
          {status.icon} {status.text}
        </p>

        {/* Status message */}
        <div className="text-center mt-4 bg-gray-300 rounded-xl relative">
          <div
            className="h-full absolute bg-primary rounded-xl transition-all duration-50 ease-linear"
            style={{ width: `${countdown}%` }}
          ></div>
          <div className="bg-gray-300 py-1"></div>
        </div>
      </div>

      <div className="flex justify-center gap-3 mt-4">
        {onBack && (
          <button
            className="btn btn-lg btn-outline hover:scale-105 active:scale-95 transition-transform duration-200"
            onClick={() => {
              webcamService.stopVideo();
              onBack();
            }}
          >
            <FaArrowLeft size={18} />
            Back
          </button>
        )}
      </div>
    </>
  );
}

export default Face;
