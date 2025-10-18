// store/slices/inactivitySlice.ts
import { AppDispatch } from "@/store";
import { AUTO_LOCK_TIME } from "@/utils/CONSTANTS";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toggleBiometricModal } from "../authSlice";

type InactivityState = {
  timerId: NodeJS.Timeout | null;
};

const initialState: InactivityState = {
  timerId: null,
};


const inactivitySlice = createSlice({
  name: "inactivity",
  initialState,
  reducers: {
    setTimer: (state, action: PayloadAction<NodeJS.Timeout | null>) => {
      state.timerId = action.payload;
    },
    clearTimer: (state) => {
      if (state.timerId) clearTimeout(state.timerId);
      state.timerId = null;
    },
    resetTimer: (state, action: PayloadAction<NodeJS.Timeout | null>) => {
      if (state.timerId) clearTimeout(state.timerId);
      state.timerId = action.payload;
    },
  },
});



export const { setTimer, clearTimer, resetTimer } = inactivitySlice.actions;
export default inactivitySlice.reducer;
