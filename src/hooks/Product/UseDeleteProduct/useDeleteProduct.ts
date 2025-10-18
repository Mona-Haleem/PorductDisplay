import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProduct } from "@/api/products";
import { setShowDeleteModal } from "@/store/slices/UISlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import Toast from "react-native-toast-message";
import { getFriendlyErrorMessage } from "@/utils/helpers";

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch<AppDispatch>();
  return useMutation({
    mutationFn: (productId: number) => deleteProduct(productId),
    onMutate: async (productId: number) => {
      await queryClient.cancelQueries({ queryKey: ["products"] });

      const previousQueries = queryClient.getQueriesData({
        queryKey: ["products"],
      });

      previousQueries.forEach(([key, data]) => {
        queryClient.setQueryData(key, (old: any[]) =>
          old?.map((p) => (p.id === productId ? { ...p, isDeleted: true } : p))
        );
      });

      return { previousQueries };
    },

    onSuccess: (deletedProduct) => {
      const allProductQueries = queryClient.getQueriesData({
        queryKey: ["products"],
      });
      allProductQueries.forEach(([key, data]) => {
        queryClient.setQueryData(key, (old: any[]) =>
          old?.filter((p) =>
            p.id !== deletedProduct!.id 
          )
        );
      });

      dispatch(
        setShowDeleteModal({
          productId: 0,
          productTitle: "",
          visisble: false,
        })
      );

    
    },

    onError: (err, productId, context) => {
      Toast.show({
        type: "error",
        text1:"Failed to delete the product",
        text2: getFriendlyErrorMessage(err.message) || ""
       
      });
      if (context?.previousQueries) {
        context.previousQueries.forEach(([key, data]) => {
          queryClient.setQueryData(key, data);
        });
      }
    },
  });
};
