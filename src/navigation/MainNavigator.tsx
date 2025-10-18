import AppNavigator from "./AppNavigator";
import AuthNavigator from "./AuthNavigator";
import { RootState } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import useStyles from "./styles";
import { useEffect } from "react";
import { storage } from "@/utils/storaeg";
import { setUser } from "@/store/slices/authSlice";
import useUser from "../hooks/Auth/useUser";
import Loading from "@/components/UI/Loading/loading";
import Gradient from "@/components/UI/Gradient";
import Toast from "react-native-toast-message";
import { getFriendlyErrorMessage } from "@/utils/helpers";
import LockOverlay from "@/components/Layout/LockOverlay";
import AuthModal from "@/components/auth/BiometricModal";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { setLoadingState, toggleBiometricModal } from "@/store/slices/UISlice";
import DeleteModal from "@/components/Layout/DeleteModal";
import { useTheme } from "@/Theme/ThemeContext";
export default function MainNavigator() {
  const token = storage.getString("accessToken");
  const dispatch = useDispatch();
  const { biometricModalShown, loading, deleteModal } = useSelector(
    (state: RootState) => state.UI
  );
  const { user } = useSelector((state: RootState) => state.auth);

  const { theme } = useTheme();
  const style = useStyles();

  const { data, isLoading, error } = useUser();

  useEffect(() => {
    if (data && user?.source !== "loginScreen") {
      dispatch(setUser({ username: data.username, image: data.image }));
      dispatch(toggleBiometricModal(true));
      dispatch(setLoadingState(false));
    } else if (error) {
      Toast.show({
        type: "error",
        text1: getFriendlyErrorMessage(error.message) || "Session Expired",
        text2: "Please try again later.",
      });
      dispatch(setLoadingState(false));
    }
    if (!token) dispatch(setLoadingState(false));

  }, [data, error, token]);

  if (loading || isLoading)
    return (
      <Gradient style={style.loadingScreen}>
        <Loading />
      </Gradient>
    );

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer
        theme={theme.mode === "dark" ? DarkTheme : DefaultTheme}
      >
        <SafeAreaView style={style.container}>
          <StatusBar style="auto" translucent={true} />
          {user ? (
            <LockOverlay>
              {biometricModalShown && <AuthModal />}
              {deleteModal.visisble && <DeleteModal />}

              <AppNavigator />
            </LockOverlay>
          ) : (
            <AuthNavigator />
          )}
        </SafeAreaView>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
