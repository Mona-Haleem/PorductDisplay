import { signOut } from "@/store/slices/authSlice";
import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useDispatch } from "react-redux";
import ProductsNavigator from "./ProductsNavigator";
import useStyles from "./styles";
import { useCallback } from "react";

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  const dispatch = useDispatch();
  const styles = useStyles();
  console.log("Rendering AppNavigator");

  const handleLogout = useCallback((e:any) => {
    e.preventDefault();
    dispatch(signOut());
  },[dispatch])
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: styles.activeTintColor.color,
        tabBarStyle: styles.tabBarStyle,
      }}
    >
      <Tab.Screen
        name="AllProducts"
        component={ProductsNavigator}
        options={{
          title: "All Products",
          tabBarIcon: ({ color, size }: { color: any; size: number }) => (
            <Ionicons name="grid-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="SignOut"
        component={() => null}
        options={{
          title: "Sign Out",
          tabBarIcon: ({ color, size }: { color: any; size: number }) => (
            <Ionicons name="log-out-outline" color={color} size={size} />
          ),
        }}
        listeners={{
          tabPress: handleLogout,
        }}
      ></Tab.Screen>
    </Tab.Navigator>
  );
}
