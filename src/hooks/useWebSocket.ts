import { useCallback, useEffect, useRef } from 'react';
import { WebSocketService } from '../services/websockets';

export const useWebSocket = (organizationId: string) => {
  const wsService = WebSocketService.getInstance();
  const socketRef = useRef<WebSocket | null>(null);

  const connect = useCallback(() => {
    wsService.connect(organizationId);
  }, [organizationId]);

  const disconnect = useCallback(() => {
    if (socketRef.current) {
      socketRef.current.close();
    }
    wsService.disconnect();
  }, []);

  const sendMessage = useCallback((message: any) => {
    wsService.sendMessage(message);
  }, []);

  useEffect(() => {
    connect();
    return () => {
      disconnect();
    };
  }, [connect, disconnect]);

  return { sendMessage };
};