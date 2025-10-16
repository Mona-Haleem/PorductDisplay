import ProductScreen from "@/screens/products";
import FilteredProductCategoryScreen from "@/screens/products/FilteredProductsCategory";
import { AppStackParamList } from "@/utils/types/navigation";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator<AppStackParamList>();

export default function ProductsNavigator() {
  console.log("Rendering AppNavigator");
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="AllProducts" component={ProductScreen} />
      <Stack.Screen
        name="CategoryProducts"
        component={FilteredProductCategoryScreen}
      />
    </Stack.Navigator>
  );
}
