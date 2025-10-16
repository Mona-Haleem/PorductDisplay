import { AppStackParamList } from "@/utils/types/navigation";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View } from "react-native";


const Stack = createNativeStackNavigator<AppStackParamList>();
export default function AppNavigator() {
  console.log("Rendering AppNavigator");
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ProductScreen" component={View} />
      <Stack.Screen name="CategoryProducts" component={View} />
    </Stack.Navigator>
  );
}
