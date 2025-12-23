// WebcamService.ts

export interface WebcamConfig {
  video: boolean | MediaTrackConstraints;
  audio: boolean | MediaTrackConstraints;
}

class WebcamService {
  private stream: MediaStream | null = null;

  // Open the webcam
  async startVideo(
    videoElement: HTMLVideoElement | null, 
    config: WebcamConfig = { video: true, audio: false }
  ): Promise<MediaStream> {
    if (!videoElement) throw new Error("Video element is not defined");

    try {
      this.stream = await navigator.mediaDevices.getUserMedia(config);
      videoElement.srcObject = this.stream;
      return this.stream;
    } catch (err) {
      console.error("Webcam Access Error:", err);
      throw err;
    }
  }

  // Close the webcam and cleanup tracks
  stopVideo(): void {
    if (this.stream) {
      this.stream.getTracks().forEach((track) => track.stop());
      this.stream = null;
    }
  }

  // Check if camera is currently active
  get isStreaming(): boolean {
    return !!this.stream && this.stream.active;
  }
}

export const webcamService = new WebcamService();