import { useRef } from 'preact/hooks';
import VideoStream from './base/VideoStream';
import { FaCamera } from 'react-icons/fa';

const OCRFront = ({
  onCapture,
  option,
}: {
  onCapture: (image: string) => void;
  option: string;
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

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
    <div className="sdk-view-front">
      <div className="text-center mb-4">
        <h3 className="text-2xl font-bold mb-2 text-primary">
          Scan Front Side
        </h3>
        <p className="text-sm text-base-content">
          Position your {option.toLowerCase()} within the frame
        </p>
      </div>

      <div
        className="relative m-auto w-full aspect-video rounded-2xl overflow-hidden shadow-2xl bg-gray-900"
        style={{ margin: '1rem 0' }}
      >
        {/* The Video Stream */}
        <VideoStream videoRef={videoRef} />

        {/* The Overlay Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 pointer-events-none w-full h-full"
        />

        {/* Guide overlay */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="relative w-4/5 h-3/4 border-2 border-dashed border-primary rounded-xl shadow-[0_0_0_9999px_rgba(0,0,0,0.5)]">
            {/* Center guide text */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-black/50 backdrop-blur-sm px-4 py-2 rounded-lg border border-primary">
                <p className="text-white text-sm font-semibold">
                  Align document here
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center gap-4 my-6">
        <input type="file" class="hidden" id='ocr_front' accept="image/*"/>
        <label class="btn btn-outline" for='ocr_front'>Upload image</label>
        <button
          onClick={handleCapture}
          className="btn btn-primary font-semibold text-white shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300"
        >
          <FaCamera size={16} />
          Capture Photo
        </button>
      </div>
      <p className="text-xs text-gray-500 text-center">
        Make sure the document is clear and all text is visible
      </p>
    </div>
  );
};

export default OCRFront;
