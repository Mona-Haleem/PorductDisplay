import { toggleBiometricModal } from "@/store/slices/authSlice";
import { AUTO_LOCK_TIME } from "@/utils/CONSTANTS";
import { useCallback, useEffect, useRef } from "react";
import {
  AppState,
  AppStateStatus,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useStyles } from "./styles";
import { RootState } from "@/store";

const LockOverlay = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch();
  const styles = useStyles();
  const { biometricModalShown } = useSelector((state: RootState) => state.auth);

  const appState = useRef<AppStateStatus>(AppState.currentState);
  const inactivityTimer = useRef<NodeJS.Timeout | null>(null);

  const resetTimer = useCallback(() => {
    if (inactivityTimer.current) {
      console.log("[LockOverlay] Clearing previous inactivity timer");
      clearTimeout(inactivityTimer.current);
    }

    console.log("[LockOverlay] Resetting inactivity timer...");
    inactivityTimer.current = setTimeout(() => {
      console.log("[LockOverlay] Inactivity timer expired — showing biometric modal");
      dispatch(toggleBiometricModal(true));
    }, AUTO_LOCK_TIME);
  }, [dispatch]);

  useEffect(() => {
    console.log("[LockOverlay] Mounting LockOverlay component");

    const subscription = AppState.addEventListener("change", (nextAppState) => {
      console.log(`[LockOverlay] AppState changed: ${appState.current} → ${nextAppState}`);

      // App moved to background or became inactive
      if (
        appState.current.match(/active/) &&
        nextAppState.match(/inactive|background/)
      ) {
        console.log("[LockOverlay] App moved to background — showing biometric modal");
        dispatch(toggleBiometricModal(true));
      }

      appState.current = nextAppState;
    });

    resetTimer();

    return () => {
      console.log("[LockOverlay] Unmounting LockOverlay component");
      subscription.remove();
      if (inactivityTimer.current) {
        console.log("[LockOverlay] Clearing inactivity timer on unmount");
        clearTimeout(inactivityTimer.current);
      }
    };
  }, [dispatch, resetTimer]);

  useEffect(() => {
    console.log(`[LockOverlay] biometricModalShown changed: ${biometricModalShown}`);
    if (!biometricModalShown) {
      console.log("[LockOverlay] Modal hidden — restarting inactivity timer");
      resetTimer();
    }
  }, [biometricModalShown, resetTimer]);

  return (
    <TouchableWithoutFeedback
      style={styles.container}
      onPress={() => {
        console.log("[LockOverlay] User touched the screen — resetting inactivity timer");
        resetTimer();
      }}
    >
      <View style={{ flex: 1 }}>{children}</View>
    </TouchableWithoutFeedback>
  );
};

export default LockOverlay;
