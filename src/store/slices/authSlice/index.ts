import { storage } from "@/utils/storage";
import { User } from "@/utils/types/auth";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  superadmin: boolean;
  biometricModalShown: boolean;
  user: User | null;
  currentScreen: string;
  loading: boolean;
  deleteModal: deleteModalProps;
}
export interface deleteModalProps {
  visisble: boolean;
  productId: number;
  productTitle: string;
}
const initialState: AuthState = {
  superadmin: false,
  biometricModalShown: false,
  user: null,
  currentScreen: "",
  loading: true,
  deleteModal: {
    visisble: false,
    productId: 0,
    productTitle: "",
  },
};

const authSlice = createSlice({
  name: "Auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.superadmin = action.payload.username === "emilys";
    },
    toggleBiometricModal: (state, action: PayloadAction<boolean>) => {
      state.biometricModalShown = action.payload && !state.deleteModal.visisble;
    },
    signOut: (state) => {
      state.superadmin = false;
      state.biometricModalShown = false;
      state.user = null;
      storage.delete("accessToken");
    },
    setCurrentScreen: (state, action: PayloadAction<string>) => {
      state.currentScreen = action.payload;
    },
    setLoadingState: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setShowDeleteModal: (state, action: PayloadAction<deleteModalProps>) => {
      state.deleteModal = action.payload;
    },
  },
});
export const {
  setUser,
  toggleBiometricModal,
  signOut,
  setCurrentScreen,
  setShowDeleteModal,
  setLoadingState,
} = authSlice.actions;
export default authSlice.reducer;
