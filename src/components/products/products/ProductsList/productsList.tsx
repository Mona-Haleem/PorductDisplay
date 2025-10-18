import { FlatList, Text, View } from "react-native";
import ProductCard from "../product/Product";
import useStyles from "../style";
import useProducts from "@/hooks/Product/useProduct/useProducts";
import renderEmpty from "@/components/UI/emptyList";

function ProductList({ category }: { category?: string }) {
  const styles = useStyles();
  const { data, error, isRefetching, isLoading, refetch } =
    useProducts(category);
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
        testID="products-flatlist"
        onRefresh={refetch}
        refreshing={isRefetching}
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
            listData: "Producs",
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
