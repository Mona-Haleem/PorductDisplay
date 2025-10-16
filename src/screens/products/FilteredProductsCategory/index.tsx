import { View, Text, StyleSheet } from "react-native";
import { useSelector } from "react-redux";

import { RootState } from "@/store";
import ProductList from "../components/products/productsList";
import Header from "../components/Header/Header";
import { LinearGradient } from "expo-linear-gradient";
import { useTheme } from "@/utils/Theme/ThemeContext";
import { useRoute } from "@react-navigation/native";
function FilteredProductCategoryScreen() {
  const params = useRoute().params as { category: string };
  const { theme } = useTheme();
  console.log("logged in ", params);
  return (
    <LinearGradient
      colors={theme.gradient as any}
      locations={[0, 0.2, 0.8, 1]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.container}
    >
      <Header />

      <ProductList category={params.category} />
    </LinearGradient>
  );
}
const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    padding: 0,
    flex: 1,
    paddingHorizontal: 30,
    backgroundColor: "#fff", //theme.colors.background,
  },
});

export default FilteredProductCategoryScreen;
