import UIReducer, {
  toggleBiometricModal,
  setCurrentScreen,
  setLoadingState,
  setShowDeleteModal,
} from "../UISlice";

describe("UISlice", () => {
  const initialState = {
    biometricModalShown: false,
    currentScreen: "",
    loading: true,
    deleteModal: {
      visisble: false,
      productId: 0,
      productTitle: "",
    },
  };

  it("should return the initial state by default", () => {
    expect(UIReducer(undefined, { type: "unknown" })).toEqual(initialState);
  });

  it("should toggle biometric modal visibility (only if deleteModal not visible)", () => {
    const nextState = UIReducer(initialState, toggleBiometricModal(true));
    expect(nextState.biometricModalShown).toBe(true);

    const withDeleteModal = {
      ...initialState,
      deleteModal: { visisble: true, productId: 1, productTitle: "Phone" },
    };
    const next = UIReducer(withDeleteModal, toggleBiometricModal(true));
    expect(next.biometricModalShown).toBe(false);
  });

  it("should set current screen", () => {
    const nextState = UIReducer(initialState, setCurrentScreen("Home"));
    expect(nextState.currentScreen).toBe("Home");
  });

  it("should update loading state", () => {
    const nextState = UIReducer(initialState, setLoadingState(false));
    expect(nextState.loading).toBe(false);
  });

  it("should set delete modal properties", () => {
    const payload = {
      visisble: true,
      productId: 2,
      productTitle: "iPhone 12",
    };
    const nextState = UIReducer(initialState, setShowDeleteModal(payload));
    expect(nextState.deleteModal).toEqual(payload);
  });
});
