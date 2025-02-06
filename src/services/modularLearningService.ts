import axios from 'axios';
import { MetricData } from '../types/dashboard';

// Define interfaces for the core modules
interface SparkEngineResponse {
    processedData: any;
    metrics: MetricData[];
}

interface AAGenomeResponse {
    analysis: any;
    metrics: MetricData[];
}

interface NeurotechResponse {
    predictions: any;
    metrics: MetricData[];
}

interface ModularResponse {
    sparkEngine: SparkEngineResponse;
    aaGenome: AAGenomeResponse;
    neurotech: NeurotechResponse;
    combinedMetrics: MetricData[];
}

const modularApi = axios.create({
    baseURL: process.env.REACT_APP_MODULAR_API_URL || 'http://localhost:5000',
    headers: {
        'Content-Type': 'application/json',
    },
});

export const modularLearningService = {
    // Process data through all three core modules
    async processData(data: any): Promise<ModularResponse> {
        try {
            const response = await modularApi.post('/api/process', {
                data,
                modules: {
                    sparkEngine: true,
                    aaGenome: true,
                    neurotechNetwork: true
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error processing data through modular learning system:', error);
            throw error;
        }
    },

    // Get specific module metrics
    async getSparkEngineMetrics(organizationId: string): Promise<MetricData[]> {
        const response = await modularApi.get(`/api/spark-engine/metrics/${organizationId}`);
        return response.data;
    },

    async getAAGenomeMetrics(organizationId: string): Promise<MetricData[]> {
        const response = await modularApi.get(`/api/aa-genome/metrics/${organizationId}`);
        return response.data;
    },

    async getNeurotechMetrics(organizationId: string): Promise<MetricData[]> {
        const response = await modularApi.get(`/api/neurotech/metrics/${organizationId}`);
        return response.data;
    },

    // Stream real-time updates from all modules
    subscribeToModularUpdates(organizationId: string, callback: (data: ModularResponse) => void) {
        const ws = new WebSocket(
            `${process.env.REACT_APP_MODULAR_WS_URL || 'ws://localhost:5000'}/organizations/${organizationId}/modular/stream`
        );

        ws.onmessage = (event) => {
            callback(JSON.parse(event.data));
        };

        return () => ws.close();
    }
};