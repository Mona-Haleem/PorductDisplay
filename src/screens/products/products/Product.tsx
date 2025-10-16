import { type Product } from "@/utils/types/product";
import { Text, TouchableOpacity, View } from "react-native";
import { Image } from "expo-image";

import { useSelector } from "react-redux";
import { RootState } from "@/store";
import Button from "@/components/UI/Button";
import useStyles from "./style";
import { Ionicons } from "@expo/vector-icons";

function ProductCard({ product }: { product: Product }) {
  const { superadmin } = useSelector((state: RootState) => state.auth);
  const style = useStyles();
  return (
    <View style={style.productCard}>
      <Image
        style={style.img}
        source={{uri:product.thumbnail}}
        transition={300} 
        cachePolicy="disk"
        contentFit="cover"
      />
      <View style={style.productData}>

      <Text style={style.ProductTitle} ellipsizeMode="tail" numberOfLines={2}>{product.title}</Text>
      {superadmin && 
      <TouchableOpacity style={style.deleteButton} onPress={() => {}}>
        <Ionicons name="trash" size={24} color="#fcf" />
      </TouchableOpacity>
      }
      </View>
    </View>
  );
}

export default ProductCard;
