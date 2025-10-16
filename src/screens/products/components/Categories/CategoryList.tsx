import { FlatList, Text, View } from "react-native";
import useStyles from "./styles";
import Category from "./Category";
import useCategories from "../../hooks/useCategories";
import renderEmpty from "@/components/emptyList";

function CategoryList() {
  const styles = useStyles();
  const { data, error, isLoading, refetch } = useCategories();
  console.log("Rendering CategoryList");
  return (
    <View>
      <Text style={styles.title}>Categories</Text>
      <FlatList
        onRefresh={refetch}
        refreshing={isLoading}
        horizontal
        data={data}
        keyExtractor={(item) => item}
        renderItem={({ item }) => <Category category={item} />}
        showsHorizontalScrollIndicator={false}
        initialNumToRender={10}
        windowSize={3}
        contentContainerStyle={styles.container}
        getItemLayout={(_, index) => ({
          length: 65,
          offset: 65 * index,
          index,
        })}
        ListEmptyComponent={() =>
          renderEmpty({
            loading: isLoading,
            error: error?.message ?? null,
            fetchData: refetch,
          })
        }
      />
    </View>
  );
}

export default CategoryList;
