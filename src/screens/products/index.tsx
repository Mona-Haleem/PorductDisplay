
import CategoryList from "@/components/products/Categories/CategoryList/CategoryList";
import Header from "@/components/products/Header/Header";
import ProductList from "@/components/products/products/ProductsList/productsList";
import Gradient from "@/components/UI/Gradient";
import useSetScreen from "@/hooks/UI/UseSetScreen";
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

export default ProductScreen;
