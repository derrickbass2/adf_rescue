import {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../../../../../PycharmProjects/adapt-ai-real/src/store';
import {fetchMetrics, setFilters, setTimeRange} from '../../../../../../PycharmProjects/adapt-ai-real/src/store/slices/dashboardSlice';

export const useDashboard = (organizationId: string) => {
    const dispatch = useAppDispatch();
    const {
        metrics,
        loading,
        error,
        timeRange,
        filters,
        lastUpdated,
    } = useAppSelector((state: { dashboard: ReturnType<typeof dashboardReducer> }) => state.dashboard);

    useEffect(() => {
        dispatch(fetchMetrics({organizationId, timeRange, filters}));
    }, [dispatch, organizationId, timeRange, filters]);

    const updateTimeRange = (newTimeRange: string) => {
        dispatch(setTimeRange(newTimeRange));
    };

    const updateFilters = (newFilters: any) => {
        dispatch(setFilters(newFilters));
    };

    return {
        metrics,
        loading,
        error,
        timeRange,
        filters,
        lastUpdated,
        updateTimeRange,
        updateFilters,
    };
};

