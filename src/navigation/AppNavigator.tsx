import { signOut } from "@/store/slices/authSlice";
import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useDispatch } from "react-redux";
import ProductsNavigator from "./ProductsNavigator";
import useStyles from "./styles";
import { useCallback } from "react";
import { mmkvPersister } from "@/utils/storaeg";
import { useQueryClient } from "@tanstack/react-query";

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  const dispatch = useDispatch();
  const styles = useStyles();
  const queryClient = useQueryClient();

  const handleLogout = useCallback(
    async (e: any) => {
      e.preventDefault();
      queryClient.clear();

      await mmkvPersister.removeClient();

      dispatch(signOut());
    },
    [dispatch]
  );
  return (
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
  );
}
