import React, { useEffect, useState } from 'react';
import './MetricCard.css';
import { MetricData } from '/Users/dbass/Documents/GitHub/adf_rescue/src/types/dashboard';

// Props for the MetricCard component
interface MetricCardProps {
  title: string;
  value: number | string;
  unit?: string;
  realTimeData?: MetricData[]; // Add realTimeData as an optional prop
}

// MetricCard: Displays a static KPI metric
export const MetricCard: React.FC<MetricCardProps> = ({ title, value, unit, realTimeData }) => {
  return (
    <div className="metric-card">
      <h3 className="metric-card-title">{title}</h3>
      <p className="metric-card-value">
        {value} {unit && <span className="metric-card-unit">{unit}</span>}
      </p>
      {realTimeData && (
        <div className="real-time-updates">
          {/* Display real-time updates here, for example */}
          {realTimeData.map((update, index) => (
            <p key={index} className="real-time-update">
              {update.timestamp}: {update.value}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

// Props for the RealTimeMetricCard component
interface RealTimeDataProps {
  fetchData: () => Promise<{ value: number | string; unit?: string }>;
}

// RealTimeMetricCard: Displays real-time KPI metric data
export const RealTimeMetricCard: React.FC<MetricCardProps & RealTimeDataProps> = ({
  title,
  fetchData,
}) => {
  const [data, setData] = useState<{ value: number | string; unit?: string }>({ value: '', unit: '' });

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const newData = await fetchData();
        setData(newData);
      } catch (error) {
        console.error(`Error fetching real-time data for ${title}:`, error);
      }
    }, 1000); // Poll every second

    return () => clearInterval(interval); // Cleanup on unmount
  }, [fetchData]);

  return <MetricCard title={title} value={data.value} unit={data.unit} />;
};

// Ensure MetricData is array-compatible
export interface LocalMetricData {
  id: string; // Unique identifier for the metric
  title: string; // Metric title
  value: number | string; // Metric value
  unit?: string; // Optional unit (e.g., %, $, etc.)
}

export const useFetchMetrics = (fetchFunction: () => Promise<LocalMetricData[]>): LocalMetricData[] => {
  const [metrics, setMetrics] = useState<LocalMetricData[]>([]);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const data = await fetchFunction();
        setMetrics(Array.isArray(data) ? data : [data]); // Ensure data is an array
      } catch (error) {
        console.error('Error fetching metrics:', error);
      }
    };

    fetchMetrics();
  }, [fetchFunction]);

  return metrics;
};