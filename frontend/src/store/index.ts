import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { combineReducers } from 'redux';
import dashboardReducer from '../reducers/dashboardReducer';
import authReducer from '../reducers/authReducer';

const rootReducer = combineReducers({
  dashboard: dashboardReducer,
  auth: authReducer,
  // Add other reducers here
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export { store };
export default store;