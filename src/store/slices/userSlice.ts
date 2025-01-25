import { createSlice } from '@reduxjs/toolkit';

interface UserState {
    id: string;
    name: string;
    email: string;
}

const initialState: UserState = {
    id: '',
    name: '',
    email: ''
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
    }
});
export default userSlice.reducer;