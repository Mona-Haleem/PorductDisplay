import { Text, View } from "react-native";
import { useStyles } from "./styles";

function Header() {
  const styles = useStyles();
  //console.log("Rendering Header");
  return (
    <View style={styles.header}>
      <Text style={styles.title}>Login</Text>
      <Text style={styles.subtitle}>Welcome back!</Text>
    </View>
  );
}

export default Header;
