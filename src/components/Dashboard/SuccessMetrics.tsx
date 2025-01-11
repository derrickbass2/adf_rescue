import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

interface SuccessMetricsProps {
  data: {
    metricName: string;
    value: number;
    description: string;
  }[] | null;
}

const SuccessMetrics: React.FC<SuccessMetricsProps> = ({ data }) => {
  if (!data || data.length === 0) {
    return <Typography>No success metrics available.</Typography>;
  }

  return (
    <Card>
      <CardContent>
        <Typography variant="h6">Success Metrics</Typography>
        {data.map((metric, index) => (
          <Typography key={index} gutterBottom>
            {metric.metricName}: {metric.value} ({metric.description})
          </Typography>
        ))}
      </CardContent>
    </Card>
  );
};

export default SuccessMetrics;