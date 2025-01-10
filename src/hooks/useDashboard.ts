import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store';
import { fetchMetricsThunk, setFilters, setTimeRange } from '../store/slices/dashboardSlice';

export const useDashboard = (organizationId: string) => {
    const dispatch = useAppDispatch();
    const {
        metrics,
        loading,
        error,
        timeRange,
        filters,
    } = useAppSelector((state) => state.dashboard);

    // Effect to fetch metrics whenever organizationId, timeRange, or filters change
    useEffect(() => {
        dispatch(fetchMetricsThunk());  // Fetch metrics without passing arguments
    }, [dispatch]);

    // Type definitions for filters and time range
    type FiltersType = {
        [key: string]: string | number | boolean;
    };

    // Ensure timeRange is used correctly as a string
    const updateFilters = (newFilters: FiltersType) => {
        dispatch(setFilters(newFilters));  // Correct usage of setFilters
    };

    const updateTimeRange = (newTimeRange: string) => {
        dispatch(setTimeRange(newTimeRange));  // Correct usage of setTimeRange
    };

    return {
        metrics,
        loading,
        error,
        updateTimeRange,
        updateFilters,
    };
};

/**
 * Custom hook to manage the dashboard state.
 * @param {string} organizationId - The ID of the organization.
 * @returns {object} The dashboard state and actions.
 */