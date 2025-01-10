import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IntegrationState {
    isLoading: boolean;
    data: any[];
    error: string | null;
}

const initialState: IntegrationState = {
    isLoading: false,
    data: [],
    error: null,
};

const integrationSlice = createSlice({
    name: 'integration',
    initialState,
    reducers: {
        fetchStart(state) {
            state.isLoading = true;
            state.error = null;
        },
        fetchSuccess(state, action: PayloadAction<any[]>) {
            state.isLoading = false;
            state.data = action.payload;
        },
        fetchFailure(state, action: PayloadAction<string>) {
            state.isLoading = false;
            state.error = action.payload;
        },
    },
});

export const { fetchStart, fetchSuccess, fetchFailure } = integrationSlice.actions;

export default integrationSlice.reducer;