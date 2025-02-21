import axios from 'axios';
import { MetricData } from '@/types/dashboard';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

interface ModularResponse {
    sparkEngine: {
        processedData: any;
        metrics: MetricData[];
    };
    aaGenome: {
        analysis: any;
        metrics: MetricData[];
    };
    neurotech: {
        predictions: any;
        metrics: MetricData[];
    };
    combinedMetrics: MetricData[];
}

export const modularLearningService = {
    async getMetrics(organizationId: string) {
        try {
            const response = await axios.get<ModularResponse>(`${API_BASE_URL}/metrics/${organizationId}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching metrics:', error);
            throw error;
        }
    },
    subscribeToUpdates(organizationId: string, param2: (data) => void) {
        
    }
};