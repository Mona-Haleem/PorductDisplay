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
import { useTheme } from "@/utils/Theme/ThemeContext";
import { storage } from "@/utils/storage";
import { setUser, toggleBiometricModal } from "@/store/slices/authSlice";
import useUser from "./useUser";
import Loading from "@/components/UI/Loading/loading";
import Gradient from "@/components/UI/Gradient";
import Toast from "react-native-toast-message";
import { getFriendlyErrorMessage } from "@/utils/helpers";
export default function MainNavigator() {
  const token = storage.getString("accessToken");
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);

  const { theme } = useTheme();
  const style = useStyles();
  //console.log("User in MainNavigator:", user, theme.mode);

  const { data, isLoading, isError, error } = useUser(token);

  useEffect(() => {
    if (data) {
      dispatch(setUser({ username: data.username, image: data.image }));
      dispatch(toggleBiometricModal(true));
    } else if (error) {
      Toast.show({
      type: "error",
      text1: getFriendlyErrorMessage(error.message) || "Session Expired",
      text2: "Please try again later.",
    }); }

    //console.log("fetched data", data);
  }, [data,error]);

 
  if (isLoading)
    return (
      <Gradient style={style.loadingScreen}>
        <Loading />
      </Gradient>
    );

  return (
    <NavigationContainer
      theme={theme.mode === "dark" ? DarkTheme : DefaultTheme}
    >
      <SafeAreaView style={style.container}>
        <StatusBar style="auto" translucent={true} />
        {user ? <AppNavigator /> : <AuthNavigator />}
      </SafeAreaView>
    </NavigationContainer>
  );
}
