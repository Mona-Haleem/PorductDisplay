import { ActivityIndicator, Text, View } from "react-native";
import useStyles from "./styles";
type LoadingProps = {
  message?: string;
  size?: "small" | "large" | number;
  color?: string;
  testID?: string;
};
export default function Loading({
  message = "Loading...",
  size = "large",
  color,
  testID,
}: LoadingProps) {
  const styles = useStyles();

  return (
    <View style={styles.container} testID={testID}>
      <ActivityIndicator size={size} color={color} />
      <Text accessibilityRole="text" style={styles.message}>
        {message}
      </Text>
    </View>
  );
}
