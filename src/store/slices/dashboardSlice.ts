import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MetricData } from '../../types/dashboard';

// Define the fetchMetrics async thunk here
export const fetchMetricsThunk = createAsyncThunk<MetricData, void, { rejectValue: string }>(
    'dashboard/fetchMetrics',
    async (_, { rejectWithValue }) => {
        try {
            // Replace with actual API call
            const response = await fetch('/api/metrics');
            const data = await response.json();
            return data;
        } catch (error) {
            if (error instanceof Error) {
                return rejectWithValue(error.message);
            } else {
                return rejectWithValue('An unknown error occurred');
            }
        }
    }
);

// Define the initial state of the dashboard slice
interface DashboardState {
  organizationId: string;
  additionalData: string;
  metrics: MetricData | null;
  timeRange: string; // Use a string to match with the timeRange passed to the slice
  filters: { [key: string]: string | number | boolean };
  realTimeData: Record<string, any>;
  loading: boolean;
  error: string | null;
}

const initialState: DashboardState = {
  organizationId: '',
  additionalData: '',
  metrics: null,
  timeRange: 'last_7_days', // Default time range
  filters: {},
  realTimeData: {},
  loading: false,
  error: null,
};

// Define the slice
const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    // Action to set the time range
    setTimeRange: (state, action: PayloadAction<string>) => {
      state.timeRange = action.payload; // Set timeRange as a string
    },
    
    // Action to set the filters
    setFilters: (state, action: PayloadAction<{ [key: string]: string | number | boolean }>) => {
      state.filters = action.payload;
    },
    
    // Action to update a specific metric value
    updateMetricValue: (
      state,
      action: PayloadAction<{
        path: string[];
        value: any;
      }>
    ) => {
      const { path, value } = action.payload;
      let current: any = state.metrics;
      for (let i = 0; i < path.length - 1; i++) {
        current = current?.[path[i]];
      }
      if (current) {
        current[path[path.length - 1]] = value;
      }
    },
    
    // Action to update real-time metrics
    updateRealTimeMetrics: (state, action: PayloadAction<{ path: string[]; value: any }[]>) => {
      action.payload.forEach(update => {
        let current: MetricData | null = state.metrics;
        for (let i = 0; i < update.path.length - 1; i++) {
          current = current?.[update.path[i]];
        }
        if (current) {
          current[update.path[update.path.length - 1]] = update.value;
        }
      });
    },
    
    // Action to add a data point to real-time metrics
    addMetricDataPoint: (
      state,
      action: PayloadAction<{
        path: string[];
        value: any;
        timestamp: number;
      }>
    ) => {
      const { path, value, timestamp } = action.payload;
      const key = path.join('.');
      if (!state.realTimeData[key]) {
        state.realTimeData[key] = [];
      }
      state.realTimeData[key].push({ value, timestamp });

      // Keep only the last 100 data points
      if (state.realTimeData[key].length > 100) {
        state.realTimeData[key].shift();
      }
    },
  },
  // Define extra reducers for async actions (like fetchMetrics)
  extraReducers: (builder) => {
    builder
      .addCase(fetchMetricsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMetricsThunk.fulfilled, (state, action: PayloadAction<MetricData>) => {
        state.loading = false;
        state.metrics = action.payload;
      })
      .addCase(fetchMetricsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch metrics';
      });
  },
});

// Export the actions for use in components or other parts of the app
export const {
  setTimeRange,
  setFilters,
  updateMetricValue,
  updateRealTimeMetrics,
  addMetricDataPoint,
} = dashboardSlice.actions;

// Export the reducer to be used in the store
export default dashboardSlice.reducer;