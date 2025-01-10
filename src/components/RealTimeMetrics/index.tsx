import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../../store';
import { useWebSocket } from '../../hooks/useWebSocket';
import { MetricCard } from '../MetricCard';
import { RealTimeChart } from '../RealTimeChart';
import { MetricData } from '../../types/dashboard';

interface RealTimeMetricsProps {
  organizationId: string;
  metricKeys: string[];
}

export const RealTimeMetrics: React.FC<RealTimeMetricsProps> = ({
  organizationId,
  metricKeys,
}) => {
  const metrics = useAppSelector(state => state.dashboard.metrics) || {};
  const [realTimeData, setRealTimeData] = useState<MetricData[]>([]);
  const { sendMessage } = useWebSocket(organizationId);

  useEffect(() => {
    sendMessage({
      type: 'SUBSCRIBE',
      payload: { metrics: metricKeys },
    });

    return () => {
      sendMessage({
        type: 'UNSUBSCRIBE',
        payload: { metrics: metricKeys },
      });
    };
  }, [sendMessage, metricKeys]);

  useEffect(() => {
    const handleWebSocketMessage = (message: any) => {
      if (message.type === 'METRIC_UPDATE') {
        setRealTimeData(prevData => [...prevData, message.payload]);
      }
    };

    window.addEventListener('message', handleWebSocketMessage);

    return () => {
      window.removeEventListener('message', handleWebSocketMessage);
    };
  }, []);

  return (
    <div className="real-time-metrics">
      {metricKeys.map(key => (
        <MetricCard
          key={key}
          title={key}
          value={metrics[key as keyof typeof metrics]}
          realTimeData={realTimeData.filter(update => update.path.includes(key))} // Ensure MetricCard accepts this
        />
      ))}
      <RealTimeChart
        data={realTimeData.map(data => ({
          ...data,
          timestamp: data.timestamp.toString(),
        }))}
      />
    </div>
  );
};