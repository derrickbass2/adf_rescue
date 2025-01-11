import { UsageAnalytics } from '../../src/types/usageAnalytics';

export interface AdoptionRates {
    rate: number;
    date: string;
}

export interface ResistanceMetrics {
    metric: string;
    value: number;
}

export interface SuccessMetrics {
    metric: string;
    value: number;
}

export interface Alert {
    message: string;
    severity: 'low' | 'medium' | 'high';
    timestamp: string;
}

export interface DetailedMetric {
    name: string;
    value: number;
    description: string;
}

export interface Department {
    name: string;
    head: string;
    employeeCount: number;
}

export interface Thresholds {
    metric: string;
    threshold: number;
}

export interface Targets {
    metric: string;
    target: number;
}

export interface MetricData {
    path: string;
    value: number;
    organizationName: string;
    lastUpdated: string;
        usageAnalytics: UsageAnalytics;
        adoptionRates: AdoptionRates;
        resistanceMetrics: ResistanceMetrics;
        successMetrics: SuccessMetrics;
        alerts: Alert[];
        detailedMetrics: DetailedMetric[];
        departments: Department[];
        thresholds: Thresholds;
        targets: Targets;
    
        [key: string]: any;
    }
    
    export interface UpdateMetricPayload {
        metricId: string;
        newValue: number;
    }