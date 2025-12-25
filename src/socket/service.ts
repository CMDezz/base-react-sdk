/* eslint-disable @typescript-eslint/no-explicit-any */
type WSMessageHandler = (data: any) => void;

export class WebSocketInstance {
  private socket: WebSocket | null = null;
  private listeners = new Set<WSMessageHandler>();

  private url = import.meta.env.VITE_SOCKET_URI;
  private reconnectInterval = 3000;
  private shouldReconnect = true;
  private sessionId = '';

  connect(sessionId: string) {
    if (this.socket || !sessionId) return;

    this.sessionId = sessionId;
    this.socket = new WebSocket(`${this.url}/${sessionId}`);

    this.socket.onopen = () => {
      console.log('[WS] Connected');
    };

    this.socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      this.listeners.forEach((cb) => cb(data));
    };

    this.socket.onclose = () => {
      this.socket = null;
      if (this.shouldReconnect) {
        setTimeout(() => this.connect(this.sessionId), this.reconnectInterval);
      }
    };
  }

  subscribe(cb: WSMessageHandler) {
    this.listeners.add(cb);
    return () => this.listeners.delete(cb);
  }

  //   send(data: WsResponse) {
  //     if (this.socket?.readyState === WebSocket.OPEN) {
  //       this.socket.send(JSON.stringify(data));
  //     }
  //   }

  disconnect() {
    this.shouldReconnect = false;
    this.socket?.close();
    this.socket = null;
  }
}
