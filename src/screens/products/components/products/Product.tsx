import { type Product } from "@/utils/types/product";
import { Text, TouchableOpacity, View } from "react-native";
import { Image } from "expo-image";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import Button from "@/components/UI/Button";
import useStyles from "./style";
import { Ionicons } from "@expo/vector-icons";
import { useDeleteProduct } from "../../hooks/useDeleteProduct";
import { useCallback, useState } from "react";
import { setShowDeleteModal } from "@/store/slices/authSlice";

function ProductCard({ product }: { product: Product }) {
  const { superadmin } = useSelector((state: RootState) => state.auth);
  // //console.log("Rendering ProductCard for product:",product.isDeleted, product.id, deleteProduct);
  const style = useStyles();
  const dispatch = useDispatch<AppDispatch>();
  const handelDeleteProduct = useCallback(() => {
    dispatch(
      setShowDeleteModal({
        productId: product.id,
        productTitle: product.title,
        visisble: true,
      })
    );
  }, [dispatch, product]);
  return (
    <View style={style.productCard}>
      <Image
        style={style.img}
        source={{ uri: product.thumbnail }}
        transition={300}
        cachePolicy="disk"
        contentFit="cover"
      />
      <View style={style.productData}>
        <Text style={style.ProductTitle} ellipsizeMode="tail" numberOfLines={2}>
          {product.title}
        </Text>
        {superadmin && (
          <TouchableOpacity
            style={style.deleteButton}
            onPress={handelDeleteProduct}
          >
            <Ionicons name="trash" size={24} color="#fcf" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

export default ProductCard;
