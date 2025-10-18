import { AUTO_LOCK_TIME } from "@/utils/CONSTANTS";
import { useCallback, useEffect, useRef } from "react";
import { AppState, AppStateStatus, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { toggleBiometricModal } from "@/store/slices/UISlice";

const LockOverlay = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch();
  const { biometricModalShown, currentScreen } = useSelector(
    (state: RootState) => state.UI
  );
  const inactivityTimer = useRef<NodeJS.Timeout | null>(null);
  const appState = useRef<AppStateStatus>(AppState.currentState);

  const handelTimerReset = useCallback(() => {
    if (inactivityTimer.current) {
      clearTimeout(inactivityTimer.current);
    }

    inactivityTimer.current = setTimeout(() => {
      dispatch(toggleBiometricModal(true));
    }, AUTO_LOCK_TIME);
  }, [dispatch]);

  const touchGesture = Gesture.Tap().onTouchesDown(() => {
    handelTimerReset();
  });

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (
        appState.current.match(/active/) &&
        nextAppState.match(/inactive|background/)
      ) {
        dispatch(toggleBiometricModal(true));
      }

      appState.current = nextAppState;
    });

    inactivityTimer.current;
    handelTimerReset();

    return () => {
      subscription.remove();
      if (inactivityTimer.current) {
        clearTimeout(inactivityTimer.current);
      }
    };
  }, [dispatch, handelTimerReset]);

  useEffect(() => {
    if (!biometricModalShown) {
      handelTimerReset();
    }
    return () => {
      if (inactivityTimer.current) {
        clearTimeout(inactivityTimer.current);
      }
    };
  }, [biometricModalShown, handelTimerReset, currentScreen]);

  return (
    <GestureDetector gesture={touchGesture}>
      <View style={{ flex: 1 }} pointerEvents="box-none">
        {children}
      </View>
    </GestureDetector>
  );
};

export default LockOverlay;
