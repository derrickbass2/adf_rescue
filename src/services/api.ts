// /Users/dbass/Documents/GitHub/adf_rescue/src/services/api.ts
import axios from 'axios';
import {MetricData, UpdateMetricPayload} from '../types/dashboard';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000',
    headers: {
        'Content-Type': 'application/json',
    },
});

export const dashboardService = {
    // Fetch dashboard metrics
    async getMetrics(
        organizationId: string,
        timeRange: string,
        filters: object
    ): Promise<MetricData> {
        const response = await api.get(`/organizations/${organizationId}/metrics`, {
            params: {timeRange, ...filters},
        });
        return response.data as MetricData;
    },

    // Update metrics
    async updateMetrics(
        organizationId: string,
        payload: UpdateMetricPayload
    ): Promise<void> {
        await api.post(`/organizations/${organizationId}/metrics`, payload);
    },

    // Stream real-time updates
    subscribeToUpdates(organizationId: string, callback: (data: MetricData) => void): () => void {
        const ws = new WebSocket(
            `${import.meta.env.VITE_WS_URL || 'ws://localhost:5000'}/organizations/${organizationId}/metrics/stream`
        );

        ws.onmessage = (event) => {
            callback(JSON.parse(event.data));
        };

        return () => ws.close();
    },

    getAlerts() {
        return [];
    }
};