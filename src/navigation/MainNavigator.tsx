
import AppNavigator from "./AppNavigator";
import AuthNavigator from "./AuthNavigator";
import { RootState } from "@/store";
import { useSelector } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
export default function MainNavigator() {
  const { user } = useSelector((state: RootState) => state.auth);
  console.log("User in MainNavigator:", user);
  return (
    <NavigationContainer>
        {user ? <AppNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
}
