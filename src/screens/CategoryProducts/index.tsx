import ProductList from "@/components/products/products/ProductsList/productsList";
import Header from "@/components/products/Header/Header";
import {  useRoute } from "@react-navigation/native";
import Gradient from "@/components/ui/Gradient";
import useSetScreen from "@/hooks/UI/UseSetScreen";
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
