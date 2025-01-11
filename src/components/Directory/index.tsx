import React, { useEffect, useState } from 'react';
import { Box, CircularProgress, Grid, Paper, ThemeProvider, Typography } from '@mui/material';
import { styled } from '@mui/system';
import SuccessMetrics from '../Dashboard/SuccessMetrics';
import { useDataFetching } from '../../hooks/useDataFetching'; // Ensure this path is correct
import theme from '/Users/dbass/Documents/GitHub/adf_rescue/src/theme'; // Ensure that the theme file exists at this path or update the path accordingly
import AlertsPanel from '../AlertsPanel';

interface DashboardProps {
  organizationId: string;
  timeRange: string;
  filters: Record<string, any>;
}

const DashboardContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  backgroundColor: theme.palette.background.default,
}));

const DashboardCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
}));

export const Dashboard: React.FC<DashboardProps> = ({
  organizationId,
  timeRange,
  filters,
}) => {
  const [metrics, setMetrics] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const { data, error: fetchError } = useDataFetching(`/api/organizations/${organizationId}/metrics`, {
    timeRange,
    filters,
  });

  useEffect(() => {
    if (data) {
      setMetrics(data);
      setLoading(false);
    }
    if (fetchError) {
      setError(fetchError);
      setLoading(false);
    }
  }, [data, fetchError]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <DashboardContainer>
        <Grid container spacing={3}>
          {/* Success Metrics */}
          <Grid item xs={12} md={6} lg={3}>
            <DashboardCard>
              <SuccessMetrics data={metrics?.successMetrics || []} />
            </DashboardCard>
          </Grid>

          {/* Alerts Panel */}
          <Grid item xs={12}>
            <AlertsPanel
              alerts={metrics?.alerts || []}
              onAlertAction={(id) => console.log(`Action triggered for alert ID: ${id}`)}
            />
          </Grid>
        </Grid>
      </DashboardContainer>
    </ThemeProvider>
  );
};

export default Dashboard;