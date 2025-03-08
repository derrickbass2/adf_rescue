import { Dispatch } from 'redux';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { MetricData } from '../types/dashboard';

// Define action types for dashboard data
export const FETCH_DASHBOARD_DATA_REQUEST = 'FETCH_DASHBOARD_DATA_REQUEST';
export const FETCH_DASHBOARD_DATA_SUCCESS = 'FETCH_DASHBOARD_DATA_SUCCESS';
export const FETCH_DASHBOARD_DATA_FAILURE = 'FETCH_DASHBOARD_DATA_FAILURE';

// Define action interfaces for dashboard data
interface FetchDashboardDataRequestAction {
    type: typeof FETCH_DASHBOARD_DATA_REQUEST;
}

interface FetchDashboardDataSuccessAction {
    type: typeof FETCH_DASHBOARD_DATA_SUCCESS;
    payload: any; // Replace 'any' with the actual data type
}

interface FetchDashboardDataFailureAction {
    type: typeof FETCH_DASHBOARD_DATA_FAILURE;
    error: string;
}

// Combine action types for dashboard data
export type DashboardActionTypes =
    | FetchDashboardDataRequestAction
    | FetchDashboardDataSuccessAction
    | FetchDashboardDataFailureAction;

// Action creators for dashboard data
export const fetchDashboardDataRequest = (): FetchDashboardDataRequestAction => ({
    type: FETCH_DASHBOARD_DATA_REQUEST,
});

export const fetchDashboardDataSuccess = (data: any): FetchDashboardDataSuccessAction => ({
    type: FETCH_DASHBOARD_DATA_SUCCESS,
    payload: data,
});

export const fetchDashboardDataFailure = (error: string): FetchDashboardDataFailureAction => ({
    type: FETCH_DASHBOARD_DATA_FAILURE,
    error,
});

// Async action to fetch dashboard data
export const fetchDashboardData = () => {
    return async (dispatch: Dispatch<DashboardActionTypes>) => {
        dispatch(fetchDashboardDataRequest());
        try {
            // Replace with actual API call
            const response = await fetch('/api/dashboard');
            const data = await response.json();
            dispatch(fetchDashboardDataSuccess(data));
        } catch (error) {
            if (error instanceof Error) {
                dispatch(fetchDashboardDataFailure(error.message));
            } else {
                dispatch(fetchDashboardDataFailure('An unknown error occurred'));
            }
        }
    };
};

// Define action types for metrics
export const FETCH_METRICS_REQUEST = 'FETCH_METRICS_REQUEST';
export const FETCH_METRICS_SUCCESS = 'FETCH_METRICS_SUCCESS';
export const FETCH_METRICS_FAILURE = 'FETCH_METRICS_FAILURE';

// Define action interfaces for metrics
interface FetchMetricsRequestAction {
    type: typeof FETCH_METRICS_REQUEST;
}

interface FetchMetricsSuccessAction {
    type: typeof FETCH_METRICS_SUCCESS;
    payload: MetricData; // Ensure the correct type for metrics data
}

interface FetchMetricsFailureAction {
    type: typeof FETCH_METRICS_FAILURE;
    error: string;
}

// Combine action types for metrics
export type MetricsActionTypes =
    | FetchMetricsRequestAction
    | FetchMetricsSuccessAction
    | FetchMetricsFailureAction;

// Action creators for metrics
export const fetchMetricsRequest = (): FetchMetricsRequestAction => ({
    type: FETCH_METRICS_REQUEST,
});

export const fetchMetricsSuccess = (data: MetricData): FetchMetricsSuccessAction => ({
    type: FETCH_METRICS_SUCCESS,
    payload: data,
});

export const fetchMetricsFailure = (error: string): FetchMetricsFailureAction => ({
    type: FETCH_METRICS_FAILURE,
    error,
});

// Async action to fetch metrics data using createAsyncThunk
export const fetchMetrics = createAsyncThunk<MetricData, void, { rejectValue: string }>(
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