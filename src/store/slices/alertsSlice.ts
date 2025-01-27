import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { Alert, AlertState } from '../../types';
import { dashboardService } from '../../services/api';
type Alert = { id: string; message: string; read: boolean; };
type AlertState = { alerts: Alert[]; unreadCount: number; };

const initialState: AlertState = {
    alerts: [],
    unreadCount: 0,
};

export const fetchAlerts = createAsyncThunk(
    'alerts/fetchAlerts',
    async (_: unknown) => {
        try {
            const response: Alert[] = await dashboardService.getAlerts();
            return response;
        } catch (error) {
                return Promise.reject((error as any)?.message || 'Failed to fetch alerts');
        }
    }
);

const alertsSlice = createSlice({
    name: 'alerts',
    initialState,
    reducers: {
        addAlert: (state: AlertState, action: PayloadAction<Alert>) => {
            state.alerts.unshift(action.payload);
            state.unreadCount += 1;
        }
    },
extraReducers: (builder: any) => {
    builder.addCase(fetchAlerts.fulfilled, (state: AlertState, action: PayloadAction<void | Alert[]>) => {
        if (action.payload) {
            state.alerts = action.payload;
            state.unreadCount = action.payload.filter((alert: Alert) => !alert.read).length;
        }
    });
}
});

export const { addAlert} = alertsSlice.actions;
