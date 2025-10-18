import { getCategoryIcon } from "@/utils/helpers";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import useStyles from "../styles";

function Category({ category }: { category: string }) {
   const styles = useStyles();
   const navigation = useNavigation();
    return (
    <TouchableOpacity
      testID="category-button"

      style={styles.categoryIcon}
      onPress={()=>navigation.navigate("CategoryProducts", { category: category })}
    >
      <Ionicons
        name={getCategoryIcon(category) as any}
        size={30}
        color="#333"
      />
    </TouchableOpacity>
  );
}

export default Category;
