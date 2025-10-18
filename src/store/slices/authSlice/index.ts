import { storage } from "@/utils/storaeg";
import { User } from "@/types/auth";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  superadmin: boolean;
  user: User | null;
}
const initialState: AuthState = {
  superadmin: false,
  user: null,
};

const authSlice = createSlice({
  name: "Auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.superadmin = action.payload.username === "emilys";
    },
    signOut: (state) => {
      state.superadmin = false;
      state.user = null;
      storage.delete("accessToken");
    },
  },
});
export const { setUser, signOut } = authSlice.actions;
export default authSlice.reducer;
