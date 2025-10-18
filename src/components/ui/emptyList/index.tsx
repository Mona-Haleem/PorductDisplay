import { Text, TouchableOpacity, View } from "react-native";
import useStyles from "./styles";
import Loading from "../Loading/loading";

type renderEmptyProp ={
  loading: boolean;
  listData?:string;
  error: string | null;
  fetchData: () => void;
}
const renderEmpty = ({loading,listData,error,fetchData}:renderEmptyProp) => {
  const styles = useStyles()
    if (loading) {
      return <Loading message={`Loading ${listData??"data"}...`} />;
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