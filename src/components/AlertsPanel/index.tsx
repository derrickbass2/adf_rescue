import React from 'react';
import { Card, CardContent, Typography, Button, Grid } from '@mui/material';

interface Alert {
  id: number;
  title: string;
  description: string;
  severity: 'info' | 'warning' | 'error' | 'success';
}

interface AlertsPanelProps {
  alerts: Alert[] | null;
  onAlertAction: (id: number) => void;
}

const AlertsPanel: React.FC<AlertsPanelProps> = ({ alerts, onAlertAction }) => {
  if (!alerts || alerts.length === 0) {
    return <Typography>No alerts available.</Typography>;
  }

  return (
    <Grid container spacing={2}>
      {alerts.map((alert) => (
        <Grid item xs={12} md={6} lg={4} key={alert.id}>
          <Card>
            <CardContent>
              <Typography variant="h6">{alert.title}</Typography>
              <Typography color="textSecondary" gutterBottom>
                {alert.description}
              </Typography>
              <Button
                variant="contained"
                color={alert.severity === 'error' ? 'error' : 'primary'}
                onClick={() => onAlertAction(alert.id)}
              >
                Take Action
              </Button>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default AlertsPanel;