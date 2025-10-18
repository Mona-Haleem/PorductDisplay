export interface UIState {
  biometricModalShown: boolean;
  currentScreen: string;
  loading: boolean;
  deleteModal: deleteModalProps;
}
export interface deleteModalProps {
  visisble: boolean;
  productId: number;
  productTitle: string;
}