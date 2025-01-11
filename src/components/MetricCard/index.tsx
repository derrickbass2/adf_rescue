import React, { useEffect, useState } from 'react';
import './index.css'; // Updated path
import { MetricData } from '../../types/dashboard';

interface MetricCardProps {
  title: string;
  value: number | string;
  unit?: string;
  realTimeData?: MetricData[];
}

export const MetricCard: React.FC<MetricCardProps> = ({ title, value, unit, realTimeData }) => {
  return (
    <div className="metric-card">
      <h3 className="metric-card-title">{title}</h3>
      <p className="metric-card-value">
        {value} {unit && <span className="metric-card-unit">{unit}</span>}
      </p>
      {realTimeData && (
        <div className="real-time-updates">
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

interface RealTimeDataProps {
  fetchData: () => Promise<{ value: number | string; unit?: string }>;
}

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
    }, 1000);

    return () => clearInterval(interval);
  }, [fetchData, title]);

  return <MetricCard title={title} value={data.value} unit={data.unit} />;
};