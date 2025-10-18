import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import InactivityTimeReducer from "./slices/InactivityTimerSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    InactivityTime:InactivityTimeReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
