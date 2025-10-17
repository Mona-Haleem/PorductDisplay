import { StyleSheet } from "react-native";

import CategoryList from "./components/Categories/CategoryList";
import ProductList from "./components/products/productsList";
import Header from "./components/Header/Header";
import Gradient from "@/components/UI/Gradient";
import useSetScreen from "./hooks/UseSetScreen";
function ProductScreen() {
  useSetScreen();
  return (
    <Gradient>
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
