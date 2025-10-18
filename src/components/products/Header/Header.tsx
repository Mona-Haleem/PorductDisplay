import { RootState } from "@/store";
import { Image } from "expo-image";
import { Text, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";
import useStyles from "./styles";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/Theme/ThemeContext";

function Header() {
  const { user } = useSelector((state: RootState) => state.auth);
  const { theme, toggleTheme } = useTheme();
  const styles = useStyles();

  return (
    <View style={styles.header}>
      <View style={styles.userContainer}>
        <View style={styles.avatar}>
          <Image
            testID="user-avatar"
            style={styles.img}
            source={{ uri: user?.image }}
            transition={300}
            cachePolicy="disk"
            contentFit="cover"
          />
        </View>
        <Text style={styles.welcome}>Welcome, </Text>
        <Text style={styles.username}> {user?.username}!</Text>
      </View>

      <TouchableOpacity
        testID="theme-toggle"
        style={styles.theme}
        onPress={toggleTheme}
      >
        <Ionicons
          testID="theme-icon"
          name={theme.mode === "dark" ? "moon" : "sunny"}
          size={25}
          color={theme.colors.primary}
        />
      </TouchableOpacity>
    </View>
  );
}

export default Header;
