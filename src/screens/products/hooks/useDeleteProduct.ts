import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProduct } from "@/api/products";

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (productId: number) => deleteProduct(productId),
    onMutate: async (productId: number) => {
      await queryClient.cancelQueries({ queryKey: ["products"] });

      const previousQueries = queryClient.getQueriesData({ queryKey: ["products"] });

      previousQueries.forEach(([key, data]) => {
        queryClient.setQueryData(key, (old: any[]) =>
          old?.map((p) => (p.id === productId ? { ...p, isDeleted: true } : p))
        );
      });

      return { previousQueries };
    },

    onSuccess: (deletedProduct) => {
      const allProductQueries = queryClient.getQueriesData({ queryKey: ["products"] });
      allProductQueries.forEach(([key, data]) => {
        queryClient.setQueryData(key, (old: any[]) =>
          old?.map((p) =>
            p.id === deletedProduct!.id ? { ...p, isDeleted: true } : p
          )
        );
      });

      console.log(
        "Product deleted successfully",
        queryClient.getQueryData(["products"])
      );
    },

    onError: (err, productId, context) => {
      console.error("Error deleting product:", err);
      if (context?.previousQueries) {
        context.previousQueries.forEach(([key, data]) => {
          queryClient.setQueryData(key, data);
        });
      }
    },
  });
};
