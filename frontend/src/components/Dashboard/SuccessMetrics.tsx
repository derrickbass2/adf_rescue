import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';

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
        <Typography variant="h6" gutterBottom>
          Success Metrics
        </Typography>
        {data.map((metric) => (
          <Box key={metric.metricName} mb={2}>
            <Typography variant="body1" gutterBottom>
              <strong>{metric.metricName}:</strong> {metric.value} ({metric.description})
            </Typography>
          </Box>
        ))}
      </CardContent>
    </Card>
  );
};

export default SuccessMetrics;