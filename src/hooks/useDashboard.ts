import { useEffect } from 'react';
import { useAppSelector } from '../store';
import { fetchMetricsThunk, setFilters, setTimeRange } from '../store/slices/dashboardSlice';
import {useAppDispatch} from "../store/useAppDispatch";

export const useDashboard = () => {
  const dispatch = useAppDispatch();
  const { metrics, loading, error } = useAppSelector((state) => state.dashboard);

  useEffect(() => {
    dispatch(fetchMetricsThunk());
  }, [dispatch]);

  const updateFilters = (newFilters: Record<string, any>) => {
    dispatch(setFilters(newFilters));
  };

  const updateTimeRange = (newTimeRange: string) => {
    dispatch(setTimeRange(newTimeRange));
  };

  return { metrics, loading, error, updateFilters, updateTimeRange };
};