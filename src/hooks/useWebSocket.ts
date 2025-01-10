import {useCallback, useEffect, useState, useRef} from 'react';
import {WebSocketService} from '../services/websockets';
import {useAppDispatch} from '../store';

export function useWebSocketWithUrl(url: string) {

  const [data, setData] = useState(null);
  const socketRef = useRef<WebSocket | null>(null);

  /**
   * Sends a message through the WebSocket connection.
   * @param message - The message to be sent.
   */
  const sendMessage = (message: any) => {
    if (socketRef.current) {
      socketRef.current.send(message);
    }
  };

  useEffect(() => {
    const socket = new WebSocket(url);
    socketRef.current = socket;

    socket.onmessage = (event) => {
      setData(event.data);
    };

    socket.onerror = (error) => {
      console.error("WebSocket Error:", error);
    };

    return () => {
      socket.close();
    };
  }, [url]);

  return { sendMessage, data };
}

export const useWebSocket = (organizationId: string) => {
    const dispatch = useAppDispatch();
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

    /**
     * Sends a message through the WebSocket connection.
     * @param message - The message to be sent.
     */
    const sendMessage = useCallback((message: any) => {
        wsService.sendMessage(message);
    }, []);

    useEffect(() => {
        connect();
        return () => {
            disconnect();
        };
    }, [connect, disconnect]);

    return {sendMessage};
};

