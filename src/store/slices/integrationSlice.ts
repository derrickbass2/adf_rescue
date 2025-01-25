import { createSlice } from '@reduxjs/toolkit';

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
    },
});
export default integrationSlice.reducer;