import React, { useEffect, useState } from 'react';
import { Box, CircularProgress, Grid, Paper, ThemeProvider, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { theme } from '../../styles/theme'; // Update the path to the correct location of the theme module
import { AdoptionRates, ResistanceIndicators, SuccessMetrics, UsageMetrics } from '../DashboardComponents/index';
import DashboardHeader from '../Hero';
// import { MetricsGrid } from '../RealTimeMetrics'; // Removed as it is not exported from the module
import { AlertsPanel } from '../AlertsPanel';
import { useDataFetching } from '../../hooks/useDataFetching'; // Ensure this path is correct or update it to the correct location
import { MetricData } from '../../types';

interface DashboardProps {
  organizationId: string;
  timeRange: string;
  filters: Record<string, any>;
}
// import { Directory } from '.';

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
  const [metrics, setMetrics] = useState<MetricData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const {
    data,
    // isLoading, // Remove unused variable
    error: fetchError,
  } = useDataFetching(`/api/organizations/${organizationId}/metrics`, {
    timeRange,
    filters,
  });

  useEffect(() => {
    if (data) {
      setMetrics(data);
      setLoading(false);
    }
    if (fetchError) {
      setError(fetchError.message);
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
        <DashboardHeader
          organizationName={metrics?.organizationName}
          lastUpdated={metrics?.lastUpdated}
        />

        <Grid container spacing={3}>
          {/* Usage Analytics */}
          <Grid item xs={12} md={6} lg={3}>
            <DashboardCard>
              <UsageMetrics
                data={metrics?.usageAnalytics}
                timeRange={timeRange}
              />
            </DashboardCard>
          </Grid>

          {/* Adoption Rates */}
          <Grid item xs={12} md={6} lg={3}>
            <DashboardCard>
              <AdoptionRates
                data={metrics?.adoptionRates}
                departments={metrics?.departments}
              />
            </DashboardCard>
          </Grid>

          {/* Resistance Indicators */}
          <Grid item xs={12} md={6} lg={3}>
            <DashboardCard>
              <ResistanceIndicators
                data={metrics?.resistanceMetrics}
                threshold={metrics?.thresholds}
              />
            </DashboardCard>
          </Grid>

          {/* Success Metrics */}
          <Grid item xs={12} md={6} lg={3}>
            <DashboardCard>
              <SuccessMetrics
                data={metrics?.successMetrics}
              />
            </DashboardCard>
          </Grid>

          {/* Alerts and Notifications */}
          <Grid item xs={12}>
            <AlertsPanel
              alerts={metrics?.alerts}
              onAlertAction={() => {}} // Define a placeholder function
            />
          </Grid>

          {/* Detailed Metrics Grid */}
          {/* <Grid item xs={12}>
            <MetricsGrid
              data={metrics?.detailedMetrics}
              onMetricClick={() => {}} // Define a placeholder function
            />
          </Grid> */}

          {/* Directory Component */}
          {/* <Grid item xs={12}>
            <Directory />
          </Grid> */}
        </Grid>
      </DashboardContainer>
    </ThemeProvider>
  );
};

// export { Directory }; // Removed to fix circular definition

