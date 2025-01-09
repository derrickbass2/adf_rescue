import {useCallback, useEffect} from 'react';
import {WebSocketService} from '../services/websocket';
import {useAppDispatch} from '../../../../../../PycharmProjects/adapt-ai-real/src/store';

export const useWebSocket = (organizationId: string) => {
    useAppDispatch();
    const wsService = WebSocketService.getInstance();

    const connect = useCallback(() => {
        wsService.connect(organizationId);
    }, [organizationId]);

    const disconnect = useCallback(() => {
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

    return {sendMessage};
};

