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
import {
  clearTimer,
  resetTimer,
  setTimer,
} from "@/store/slices/InactivityTimerSlice";
import { handelTimerReset } from "@/utils/helpers";
import { Gesture, GestureDetector } from "react-native-gesture-handler";

const LockOverlay = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch();
  const styles = useStyles();
  const { biometricModalShown, currentScreen } = useSelector(
    (state: RootState) => state.auth
  );
  const { timerId } = useSelector((state: RootState) => state.InactivityTime);
  const appState = useRef<AppStateStatus>(AppState.currentState);
  const touchGesture = Gesture.Tap().onTouchesDown(() => {
    console.log('reset geasture')
    dispatch(resetTimer(handelTimerReset(dispatch)));
  });

  useEffect(() => {
    console.log("[LockOverlay] Mounting LockOverlay component");

    const subscription = AppState.addEventListener("change", (nextAppState) => {
      console.log(
        `[LockOverlay] AppState changed: ${appState.current} → ${nextAppState}`
      );

      // App moved to background or became inactive
      if (
        appState.current.match(/active/) &&
        nextAppState.match(/inactive|background/)
      ) {
        console.log(
          "[LockOverlay] App moved to background — showing biometric modal"
        );
        dispatch(toggleBiometricModal(true));
      }

      appState.current = nextAppState;
    });

    timerId
      ? dispatch(setTimer(handelTimerReset(dispatch)))
      : dispatch(resetTimer(handelTimerReset(dispatch)));

    return () => {
      console.log("[LockOverlay] Unmounting LockOverlay component");
      subscription.remove();
      if (timerId) {
        console.log("[LockOverlay] Clearing inactivity timer on unmount");
        dispatch(clearTimer());
      }
    };
  }, [dispatch, resetTimer]);

  useEffect(() => {
    console.log(
      `[LockOverlay] biometricModalShown changed: ${biometricModalShown}`,
      currentScreen
    );
    if (!biometricModalShown) {
      console.log("[LockOverlay] Modal hidden — restarting inactivity timer");
      dispatch(resetTimer(handelTimerReset(dispatch)));
    }
    return () => {
      console.log("[LockOverlay] Unmounting LockOverlay component");
      if (timerId) {
        console.log("[LockOverlay] Clearing inactivity timer on unmount");
        dispatch(clearTimer());
      }
    };
  }, [biometricModalShown, resetTimer, currentScreen]);

  return (
    <GestureDetector gesture={touchGesture}>
      <View style={{ flex: 1 }} pointerEvents="box-none">
        {children}
      </View>
    </GestureDetector>
  );
};

export default LockOverlay;
