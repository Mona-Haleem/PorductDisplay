import { View, Text, StyleSheet } from "react-native";
import { useSelector } from "react-redux";

import { RootState } from "@/store";
import ProductList from "../components/products/productsList";
import Header from "../components/Header/Header";
import { useTheme } from "@/utils/Theme/ThemeContext";
import { useRoute } from "@react-navigation/native";
import Gradient from "@/components/UI/Gradient";
function FilteredProductCategoryScreen() {
  const params = useRoute().params as { category: string };
  //console.log("logged in ", params);
  return (
    <Gradient>
      <Header />

      <ProductList category={params.category} />
    </Gradient>
  );
}

export default FilteredProductCategoryScreen;
