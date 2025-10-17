import { StyleSheet } from "react-native";

import CategoryList from "./components/Categories/CategoryList";
import ProductList from "./components/products/productsList";
import Header from "./components/Header/Header";
import { useTheme } from "@/utils/Theme/ThemeContext";
import Gradient from "@/components/UI/Gradient";
function ProductScreen() {
  const { theme } = useTheme();
  //console.log("logged in ");
  return (
    <Gradient
     
    >
      <Header />
      <CategoryList />
      <ProductList />
    </Gradient>
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

export default ProductScreen;
