import { getProducts, getProductsByCategory } from "@/api/products";
import { useQuery } from "@tanstack/react-query";

const useProducts = (category?: string) => {
  const query = useQuery({
    queryKey: ["products", category || "all"],
    queryFn: () => {
      if (category) return getProductsByCategory(category);
      return getProducts();
    },
  });

  return query;
};

export default useProducts;
