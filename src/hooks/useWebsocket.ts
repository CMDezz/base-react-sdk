import { useEffect, useRef, useState } from 'preact/hooks';
import { WebSocketInstance } from '@sdk/socket/service';
import { ENUM_STEPS } from '@sdk/utils/constant';

const fakeFistMessage: WsResponse = {
  session_id: '123',
  status: '',
  reconnected: false,
  current_step: ENUM_STEPS.SELECT,
  completed_steps: [],
};
export function useSocketConnection(sessionId: string) {
  const socketRef = useRef<WebSocketInstance>();
  const [lastMessage, setLastMessage] = useState<WsResponse | null>(
    fakeFistMessage
  );

  useEffect(() => {
    if (!sessionId) return;

    if (!socketRef.current) {
      socketRef.current = new WebSocketInstance();
    }

    const socket = socketRef.current;
    socket.connect(sessionId);

    const unsubscribe = socket.subscribe((msg) => {
      setLastMessage(msg);
    });

    return () => {
      unsubscribe();
      socket.disconnect();
    };
  }, [sessionId]);

  const mockingSignals = async (message: WsResponse) => {
    setLastMessage(message);
  };

  return {
    lastMessage,
    // send: (data: unknown) => socketRef.current?.send(data),
    mockingSignals,
  };
}
