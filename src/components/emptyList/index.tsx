import { Text, TouchableOpacity, View } from "react-native";
import Loading from "../UI/Loading/loading";
import useStyles from "./styles";

type renderEmptyProp ={
  loading: boolean;
  error: string | null;
  fetchData: () => void;
}
const renderEmpty = ({loading,error,fetchData}:renderEmptyProp) => {
  const styles = useStyles()
    if (loading) {
      return <Loading message="Loading categories..." />;
    }

    if (error) {
      return (
        <View style={styles.center}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={fetchData}>
            <Text style={styles.retryText}>Retry</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <Text style={styles.emptyText}>No item found.</Text>
    );
  };
export default renderEmpty;