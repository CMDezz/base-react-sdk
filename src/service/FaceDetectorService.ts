import {
  FaceDetector,
  FilesetResolver,
  type Detection,
} from "@mediapipe/tasks-vision";
import { DEFAULT_THEME_CONFIG } from "@sdk/utils/config";

type FrameCallback = (detection: Detection, faceInFrame: boolean) => void;
type FaceDetectorResult = Awaited<ReturnType<FaceDetector["detectForVideo"]>>;

export default class FaceDetectorManager {
  private faceDetector: FaceDetector | null;
  private canvas: HTMLCanvasElement | null;
  private ctx: CanvasRenderingContext2D | null;
  private lastVideoTime: number;
  private isDetecting: boolean;

  constructor() {
    this.faceDetector = null;
    this.canvas = null;
    this.ctx = null;
    this.lastVideoTime = -1;
    this.isDetecting = false;
  }

  async initialize(canvasElement: HTMLCanvasElement): Promise<boolean> {
    try {
      this.canvas = canvasElement;
      this.ctx = canvasElement.getContext("2d");

      const vision = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
      );

      this.faceDetector = await FaceDetector.createFromOptions(vision, {
        baseOptions: {
          modelAssetPath: `https://storage.googleapis.com/mediapipe-models/face_detector/blaze_face_short_range/float16/1/blaze_face_short_range.tflite`,
          delegate: "GPU",
        },
        runningMode: "VIDEO",
        minDetectionConfidence: 0.5,
      });

      console.log("Face detector initialized");
      return true;
    } catch (error) {
      console.error("Error initializing face detector:", error);
      return false;
    }
  }

  startDetection(
    videoElement: HTMLVideoElement,
    frameCallback?: FrameCallback
  ): void {
    if (!this.faceDetector || !this.canvas || !this.ctx) {
      console.error("Face detector not initialized");
      return;
    }

    this.isDetecting = true;
    this.detectFrame(videoElement, frameCallback);
  }

  stopDetection(): void {
    this.isDetecting = false;
    if (this.ctx && this.canvas) {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
  }

  private detectFrame(
    videoElement: HTMLVideoElement,
    frameCallback?: FrameCallback
  ): void {
    if (!this.isDetecting || !this.faceDetector || !this.ctx || !this.canvas) return;

    const startTimeMs = performance.now();

    if (videoElement.currentTime !== this.lastVideoTime) {
      this.lastVideoTime = videoElement.currentTime;

      const videoRect = videoElement.getBoundingClientRect();
      const displayWidth = Math.floor(videoRect.width);
      const displayHeight = Math.floor(videoRect.height);

      if (this.canvas.width !== displayWidth || this.canvas.height !== displayHeight) {
        this.canvas.width = displayWidth;
        this.canvas.height = displayHeight;
      }

      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      const detections: FaceDetectorResult = this.faceDetector.detectForVideo(
        videoElement,
        startTimeMs
      );

      let faceInFrame = false;
      if (detections.detections && detections.detections.length > 0) {
        const scaleX = displayWidth / videoElement.videoWidth;
        const scaleY = displayHeight / videoElement.videoHeight;

        detections.detections.forEach((detection: Detection) => {
          this.drawDetectionScaled(detection, scaleX, scaleY);
        });

        faceInFrame = this.isFaceInFrame(
          detections.detections[0],
          displayWidth,
          displayHeight,
          scaleX,
          scaleY
        );

        if (frameCallback) {
          frameCallback(detections.detections[0], faceInFrame);
        }
      }

      this.drawTrackingFrame(displayWidth, displayHeight, faceInFrame);
    }

    if (this.isDetecting) {
      requestAnimationFrame(() => this.detectFrame(videoElement, frameCallback));
    }
  }

  private drawTrackingFrame(displayWidth: number, displayHeight: number, faceInFrame: boolean = false): void {
    if (!this.ctx) return;

    const frameAspectRatio = 280 / 360;
    const canvasAspectRatio = displayWidth / displayHeight;

    let frameWidth: number;
    let frameHeight: number;
    if (canvasAspectRatio > frameAspectRatio) {
      frameHeight = displayHeight * 0.65;
      frameWidth = frameHeight * frameAspectRatio;
    } else {
      frameWidth = displayWidth * 0.45;
      frameHeight = frameWidth / frameAspectRatio;
    }

    const centerX = displayWidth / 2;
    const centerY = displayHeight / 2;
    const radiusX = frameWidth / 2;
    const radiusY = frameHeight / 2;

    this.ctx.save();
    this.ctx.strokeStyle = faceInFrame ? DEFAULT_THEME_CONFIG.colors.success : DEFAULT_THEME_CONFIG.colors.danger;
    this.ctx.lineWidth = 5;
    // this.ctx.setLineDash([12, 8]);
    this.ctx.beginPath();
    this.ctx.ellipse(centerX, centerY, radiusX, radiusY, 0, 0, 2 * Math.PI);
    this.ctx.stroke();
    this.ctx.restore();
  }

  private drawDetectionScaled(detection: Detection, scaleX: number, scaleY: number): void {
    const ctx = this.ctx;
    if (!detection.boundingBox || !ctx) return;

    const bbox = detection.boundingBox;
    const x = bbox.originX * scaleX;
    const y = bbox.originY * scaleY;
    const width = bbox.width * scaleX;
    const height = bbox.height * scaleY;

    ctx.strokeStyle = "#22c55e";
    ctx.lineWidth = 2;
    ctx.strokeRect(x, y, width, height);

    if (detection.keypoints) {
      detection.keypoints.forEach((keypoint) => {
        const kx = keypoint.x * scaleX;
        const ky = keypoint.y * scaleY;
        ctx.beginPath();
        ctx.arc(kx, ky, 3, 0, 2 * Math.PI);
        ctx.fillStyle = "#22c55e";
        ctx.fill();
      });
    }

    if (detection.categories && detection.categories[0]) {
      const confidence = detection.categories[0].score;
      ctx.fillStyle = "#22c55e";
      ctx.font = "14px Arial";
      ctx.fillText(`${(confidence * 100).toFixed(0)}%`, x, y - 5);
    }
  }

  private isFaceInFrame(
    detection: Detection,
    canvasWidth: number,
    canvasHeight: number,
    scaleX: number,
    scaleY: number
  ): boolean {
    if (!detection.boundingBox || !detection.categories || !detection.categories[0]) return false;

    const bbox = detection.boundingBox;
    const confidence = detection.categories[0].score;

    if (confidence < 0.7) return false;

    const scaledX = bbox.originX * scaleX;
    const scaledY = bbox.originY * scaleY;
    const scaledWidth = bbox.width * scaleX;
    const scaledHeight = bbox.height * scaleY;

    const frameAspectRatio = 280 / 360;
    const canvasAspectRatio = canvasWidth / canvasHeight;

    let frameWidth: number;
    let frameHeight: number;
    if (canvasAspectRatio > frameAspectRatio) {
      frameHeight = canvasHeight * 0.65;
      frameWidth = frameHeight * frameAspectRatio;
    } else {
      frameWidth = canvasWidth * 0.45;
      frameHeight = frameWidth / frameAspectRatio;
    }

    const frameCenterX = canvasWidth / 2;
    const frameCenterY = canvasHeight / 2;

    const faceCenterX = scaledX + scaledWidth / 2;
    const faceCenterY = scaledY + scaledHeight / 2;

    const toleranceX = frameWidth * 0.3;
    const toleranceY = frameHeight * 0.3;

    const withinX = Math.abs(faceCenterX - frameCenterX) <= frameWidth / 2 + toleranceX;
    const withinY = Math.abs(faceCenterY - frameCenterY) <= frameHeight / 2 + toleranceY;

    const sizeRatioWidth = scaledWidth / frameWidth;
    const sizeRatioHeight = scaledHeight / frameHeight;
    const sizeOk =
      sizeRatioWidth > 0.5 &&
      sizeRatioWidth < 1.2 &&
      sizeRatioHeight > 0.5 &&
      sizeRatioHeight < 1.2;

    return withinX && withinY && sizeOk;
  }
}