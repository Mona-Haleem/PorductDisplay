import { FlatList, RefreshControl, Text, View } from "react-native";
import ProductCard from "./Product";
import useStyles from "./style";
import useProducts from "../../hooks/useProducts";
import renderEmpty from "@/components/emptyList";
import { Product } from "@/utils/types/product";
import { useDispatch } from "react-redux";
import {
  clearTimer,
  resetTimer,
  setTimer,
} from "@/store/slices/InactivityTimerSlice";
import { handelTimerReset } from "@/utils/helpers";

function ProductList({ category }: { category?: string }) {
  const styles = useStyles();
  const { data, error, isRefetching, isLoading, refetch } =
    useProducts(category);
  const dispatch = useDispatch();
  //console.log("Rendering ProductList");
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.titleContainer}>
        {category && (
          <Text style={[styles.title, styles.highlight]}>
            {category?.replace("-", " ") ?? "Featured"}
          </Text>
        )}
        <Text style={styles.title}>Products</Text>
      </View>
      <FlatList
        onRefresh={refetch}
        refreshing={isRefetching}
        //        refreshControl={
        //   <RefreshControl
        //     refreshing={isRefetching}
        //     onRefresh={refetch}
        //     colors={['#9Bd35A', '#689F38']} // Android
        //     tintColor="#689F38" // iOS
        //     title="Pull to refresh" // iOS only
        //   />
        // }

        data={data}
        numColumns={2}
        keyExtractor={(item) => item.title}
        renderItem={({ item }) => <ProductCard product={item} />}
        showsVerticalScrollIndicator={false}
        initialNumToRender={10}
        windowSize={5}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.container}
        ListEmptyComponent={() =>
          renderEmpty({
            loading: isLoading,
            error: error?.message ?? null,
            fetchData: refetch,
          })
        }
        getItemLayout={(_, index) => ({
          length: 250,
          offset: 250 * index,
          index,
        })}
      />
    </View>
  );
}

export default ProductList;
