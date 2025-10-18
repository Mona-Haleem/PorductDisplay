import { deleteModalProps, UIState } from "@/types/UI";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: UIState = {
  biometricModalShown: false,
  currentScreen: "",
  loading: true,
  deleteModal: {
    visisble: false,
    productId: 0,
    productTitle: "",
  },
};

const UISlice = createSlice({
  name: "UI",
  initialState,
  reducers: {
    toggleBiometricModal: (state, action: PayloadAction<boolean>) => {
      state.biometricModalShown = action.payload && !state.deleteModal.visisble;
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
  toggleBiometricModal,
  setCurrentScreen,
  setShowDeleteModal,
  setLoadingState,
} = UISlice.actions;
export default UISlice.reducer;
