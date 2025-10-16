import { TouchableOpacity, Text } from "react-native";
import useStyles from "./style";

interface ButtonProps {
  onPress: () => void;
  title: string;
  varient?: "filled" | "secondary";
}

export default function Button({
  onPress,
  title,
  varient = "filled",
}: ButtonProps) {
  const styles = useStyles();
  return (
    <TouchableOpacity style={varient === 'secondary'?styles.secondaryButton :styles.button} onPress={onPress}>
      <Text style={ varient === 'secondary'?styles.secondaryButtonText :styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
}
