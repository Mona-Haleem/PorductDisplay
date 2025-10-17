import { signOut } from "@/store/slices/authSlice";
import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useDispatch, useSelector } from "react-redux";
import ProductsNavigator from "./ProductsNavigator";
import useStyles from "./styles";
import { useCallback } from "react";
import { RootState } from "@/store";
import AuthModal from "@/components/auth/BiometricModal";
import LockOverlay from "@/components/LockOverlay";

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  const dispatch = useDispatch();
  const styles = useStyles();
  const { user, biometricModalShown } = useSelector(
    (state: RootState) => state.auth
  );
  //console.log("Rendering AppNavigator");

  const handleLogout = useCallback(
    (e: any) => {
      e.preventDefault();
      dispatch(signOut());
    },
    [dispatch]
  );
  return (
    <LockOverlay>
      {biometricModalShown && <AuthModal />}

      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: styles.activeTintColor.color,
          tabBarStyle: styles.tabBarStyle,
        }}
      >
        <Tab.Screen
          name="Products"
          component={ProductsNavigator}
          options={{
            title: "Products",
            tabBarIcon: ({ color, size }: { color: any; size: number }) => (
              <Ionicons name="grid-outline" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="SignOut"
          options={{
            title: "Sign Out",
            tabBarIcon: ({ color, size }: { color: any; size: number }) => (
              <Ionicons name="log-out-outline" color={color} size={size} />
            ),
          }}
          listeners={{
            tabPress: handleLogout,
          }}
        >
          {() => null}
        </Tab.Screen>
      </Tab.Navigator>
    </LockOverlay>
  );
}
