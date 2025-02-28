// /Users/dbass/Documents/GitHub/adf_rescue/src/services/modularLearningService.ts
import { store } from '../store';
import { updateRealTimeMetrics, updateMetricValue } from '../store/slices/dashboardSlice';
import { WebSocketMessage } from '../types/index';
import { MetricData } from '../types/dashboard';
import { addAlert } from '../store/slices/alertsSlice';
import axios from 'axios';

interface ModularResponse {
    sparkEngine: {
        processedData?: any;
        metrics: MetricData[];
    };
    aaGenome: {
        analysis?: any;
        metrics: MetricData[];
    };
    neurotech: {
        predictions?: any;
        metrics: MetricData[];
    };
    combinedMetrics: MetricData[];
}

const api = axios.create({
    baseURL: import.meta.env.VITE_MODULAR_API_URL || 'http://localhost:5000',
    headers: {
        'Content-Type': 'application/json',
    },
});

export const handleWebSocketReconnection = (options: { onReconnecting: () => void; onReconnected: () => void; }) => {
    options.onReconnecting();
    setTimeout(() => {
        options.onReconnected();
    }, 3000);
};

export class WebSocketService {
    private static instance: WebSocketService;
    private ws: WebSocket | null = null;
    private messageListeners: ((event: MessageEvent) => void)[] = [];
    private reconnectAttempts = 0;
    private organizationId: string | null = null;
    private readonly maxReconnectAttempts = 5;
    private readonly reconnectTimeout = 3000;

    private constructor() {}

    public static getInstance(): WebSocketService {
        if (!WebSocketService.instance) {
            WebSocketService.instance = new WebSocketService();
        }
        return WebSocketService.instance;
    }

    public connect(organizationId: string): void {
        this.organizationId = organizationId;
        const wsUrl = `${import.meta.env.VITE_WS_URL || 'ws://localhost:5000'}/ws/${organizationId}`;

        this.ws = new WebSocket(wsUrl);
        this.setupEventHandlers();
    }

    public sendMessage(message: any): void {
        if (this.ws?.readyState === WebSocket.OPEN) {
            this.ws.send(JSON.stringify(message));
        }
    }

    public disconnect(): void {
        if (this.ws) {
            this.ws.close();
            this.ws = null;
        }
    }

    public isConnected(): boolean {
        return this.ws !== null;
    }

    private setupEventHandlers(): void {
        if (!this.ws) return;

        this.ws.onopen = this.handleOpen.bind(this);
        this.ws.onclose = this.handleClose.bind(this);
        this.ws.onerror = this.handleError.bind(this);
        this.ws.onmessage = this.handleMessage.bind(this);
    }

    private handleOpen(): void {
        console.log('WebSocket connection established');
        this.reconnectAttempts = 0;

        this.sendMessage({
            type: 'AUTH',
            payload: {
                token: localStorage.getItem('authToken'),
            },
        });
    }
    private handleMessage(event: MessageEvent): void {
        try {
            const message: WebSocketMessage = JSON.parse(event.data);
            this.processMessage(message);
            this.messageListeners.forEach(listener => listener(event));
        } catch (error) {
            console.error('Error processing WebSocket message:', error);
        }
    }

    public addMessageListener(listener: (event: MessageEvent) => void): void {
        this.messageListeners.push(listener);
    }

    public removeMessageListener(listener: (event: MessageEvent) => void): void {
        this.messageListeners = this.messageListeners.filter(l => l !== listener);
    }

    private processMessage(message: WebSocketMessage): void {
        switch (message.type) {
            case 'METRIC_UPDATE':
                this.handleMetricUpdate(message.payload as MetricUpdate);
                break;
            case 'ALERT': {
                const metrics = message.payload.metrics.map((metric: any) => ({
                    path: metric.path,
                    value: metric.value,
                }));
                store.dispatch(updateRealTimeMetrics(metrics));
                store.dispatch(addAlert(message.payload));
                break;
            }
            default:
                console.warn('Unknown message type:', message.type);
        }
    }

    private handleMetricUpdate(metricUpdate: MetricUpdate): void {
        store.dispatch(updateMetricValue({
            path: metricUpdate.path,
            value: metricUpdate.value,
        }));
    }

    private handleClose(event: CloseEvent): void {
        console.log('WebSocket connection closed', event);
        this.attemptReconnect();
    }

    private handleError(error: any): void {
        console.error('WebSocket error:', error);
        store.dispatch({
            type: 'WS_ERROR',
            payload: error,
        });
    }

    private attemptReconnect(): void {
        if (this.reconnectAttempts >= this.maxReconnectAttempts) {
            console.error('Max reconnection attempts reached');
            return;
        }

        this.reconnectAttempts++;
        setTimeout(() => {
            if (this.organizationId) {
                this.connect(this.organizationId);
            } else {
                console.error('No organizationId available for reconnection');
            }
        }, this.reconnectTimeout);
    }
}

export const modularLearningService = {
    async processData(data: any, organizationId: string, config?: Record<string, any>): Promise<ModularResponse> {
        try {
            const response = await api.post('/api/process', {
                data,
                organization_id: organizationId,
                config
            });
            return response.data;
        } catch (error) {
            console.error('Error processing data:', error);
            throw error;
        }
    },

    subscribeToUpdates(
        organizationId: string,
        callback: (data: ModularResponse) => void
    ): () => void {
        const wsService = WebSocketService.getInstance();
        wsService.connect(organizationId);

        const messageHandler = (event: MessageEvent) => {
            try {
                const data = JSON.parse(event.data);
                if (data.type === 'MODULAR_UPDATE') {
                    callback(data.payload);
                }
            } catch (error) {
                console.error('Error handling WebSocket message:', error);
            }
        };

        wsService.addMessageListener(messageHandler);

        return () => {
            wsService.removeMessageListener(messageHandler);
            wsService.disconnect();
        };
    }
};

interface MetricUpdate {
    path: string[];
    value: number;
}