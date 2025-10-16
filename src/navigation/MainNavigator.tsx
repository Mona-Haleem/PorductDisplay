import AppNavigator from "./AppNavigator";
import AuthNavigator from "./AuthNavigator";
import { RootState } from "@/store";
import { useSelector } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";
import { DarkTheme, DefaultTheme, NavigationContainer} from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import useStyles from "./styles";
import { useEffect } from "react";
import { useTheme } from "@/utils/Theme/ThemeContext";
export default function MainNavigator() {
  const { user } = useSelector((state: RootState) => state.auth);
  const {theme } = useTheme();
  const style = useStyles();
  console.log("User in MainNavigator:", user, theme.mode);

  useEffect(() => {
    console.log("Auth state changed, user:", user);
  }, []);

  return (
    <NavigationContainer theme={theme.mode === "dark" ? DarkTheme : DefaultTheme}>
      <SafeAreaView style={style.container}>
        <StatusBar style="auto" />
        {user ? <AppNavigator /> : <AuthNavigator />}
      </SafeAreaView>
    </NavigationContainer>
  );
}
