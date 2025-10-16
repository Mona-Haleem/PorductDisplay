import { FlatList, Text, View } from "react-native";
import ProductCard from "./Product";
import useStyles from "./style";
const data = Array.from({ length: 20 }).map((_, index) => ({
  id: index.toString(),
  title: `Producthhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh ${index + 1}`,
  isDeleted: Math.random() < 0.3, 
  thumbnail: `https://placehold.co/600x400?text=Hello+World+${index + 1}`,
}));
function ProductList({category}:{category?:string}) {
  const styles = useStyles();
  console.log("Rendering ProductList");
  return (
    <View style={{ flex: 1 }}>
      <Text style={styles.title}>Featured {category ?? ""} Products</Text>
      <FlatList
        data={data}
        numColumns={2}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ProductCard product={item} />}
        showsVerticalScrollIndicator={false}
        initialNumToRender={10}
        windowSize={5}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.container}
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
