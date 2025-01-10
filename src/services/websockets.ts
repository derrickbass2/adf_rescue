import {store} from '/Users/dbass/Documents/GitHub/adf_rescue/src/store';
import { updateRealTimeMetrics, updateMetricValue } from '../store/slices/dashboardSlice';
import {WebSocketMessage} from '../types/index';
import { addAlert } from '../store/slices/alertsSlice';
export const handleWebSocketReconnection = (options: { onReconnecting: () => void; onReconnected: () => void; }) => {
    // implementation of handleWebSocketReconnection
    options.onReconnecting();
    // Simulate reconnection logic
    setTimeout(() => {
        options.onReconnected();
    }, 3000);
};
export class WebSocketService {
    private static instance: WebSocketService;
    private ws: WebSocket | null = null;
    private reconnectAttempts = 0;
    private organizationId: string | null = null;
    private maxReconnectAttempts = 5;
    private reconnectTimeout = 3000;

    private constructor() {
    }

    public static getInstance(): WebSocketService {
        if (!WebSocketService.instance) {
            WebSocketService.instance = new WebSocketService();
        }
        return WebSocketService.instance;
    }

    public connect(organizationId: string): void {
        this.organizationId = organizationId;
        const wsUrl = `${process.env.REACT_APP_WS_URL}/organizations/${organizationId}/metrics/stream`;

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

    private setupEventHandlers(): void {
        if (!this.ws) return;

        this.ws.onopen = this.handleOpen.bind(this);
        // this.ws.onclose = this.onClose.bind(this);
        this.ws.onclose = this.handleClose.bind(this);
        this.ws.onerror = this.handleError.bind(this);
        this.ws.onmessage = this.handleMessage.bind(this);
    }

    private handleOpen(): void {
        console.log('WebSocket connection established');
        this.reconnectAttempts = 0;

        // Send authentication message
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
        } catch (error) {
            console.error('Error processing WebSocket message:', error);
        }
    }

    private processMessage(message: WebSocketMessage): void {
        switch (message.type) {
            case 'METRIC_UPDATE':
                this.handleMetricUpdate(message.payload as MetricUpdate);
                break;
            case 'ALERT':
                const metrics = message.payload.metrics.map((metric: any) => ({
                    path: metric.path,
                    value: metric.value,
                }));
                store.dispatch(updateRealTimeMetrics(metrics));
                store.dispatch(addAlert(message.payload));
                break;
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

interface MetricUpdate {
    path: string[];
    value: number;
}
