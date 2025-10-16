import { storage } from "@/utils/storage";
import { User } from "@/utils/types/auth";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  superadmin: boolean;
  biometricModalShown: boolean;
  user:User|null
}

const initialState: AuthState = {
 
  superadmin: false,
  biometricModalShown: false,
  user:null
};

const authSlice = createSlice({
  name: "Auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload
      state.superadmin = action.payload.username === 'emilys' ;
    },
    toggleBiometricModal: (state, action: PayloadAction<boolean>) => {
      state.biometricModalShown = action.payload;
    },
    signOut: (state) => {
      state.superadmin = false;
      state.biometricModalShown = false;
      state.user = null;
      storage.delete('accessesToken')
    },
  },
});
export const { setUser, toggleBiometricModal, signOut } =
  authSlice.actions;
export default authSlice.reducer;
