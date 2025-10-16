import { FlatList, Text, View } from "react-native";
import useStyles from "./styles";
import Category from "./Category";
const data: string[] = [
  "beauty",
  "fragrances",
  "furniture",
  "groceries",
  "home-decoration",
  "kitchen-accessories",
  "laptops",
  "mens-shirts",
  "mens-shoes",
  "mens-watches",
  "mobile-accessories",
  "motorcycle",
  "skin-care",
  "smartphones",
  "sports-accessories",
  "sunglasses",
  "tablets",
  "tops",
  "vehicle",
  "womens-bags",
  "womens-dresses",
  "womens-jewellery",
  "womens-shoes",
  "womens-watches",
];

function CategoryList() {
  const styles = useStyles();
  console.log("Rendering CategoryList");
  return (
    <View>
      <Text style={styles.title}>Categories</Text>
      <FlatList
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
      />
    </View>
  );
}

export default CategoryList;
