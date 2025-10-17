import ProductList from "../components/products/productsList";
import Header from "../components/Header/Header";
import {  useRoute } from "@react-navigation/native";
import Gradient from "@/components/UI/Gradient";
import useSetScreen from "../hooks/UseSetScreen";
function FilteredProductCategoryScreen() {
  const params = useRoute().params as { category: string };
  useSetScreen()
  return (
    <Gradient>
      <Header />

      <ProductList category={params.category} />
    </Gradient>
  );
}

export default FilteredProductCategoryScreen;
