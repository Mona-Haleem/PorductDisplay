import { getCategoriesList } from "@/api/products";
import { useQuery } from "@tanstack/react-query";


const useCategories =()=>{
    const query = useQuery({
    queryKey: ["categories"],
    queryFn: () => getCategoriesList(),    
  });
  return query
}

export default useCategories;