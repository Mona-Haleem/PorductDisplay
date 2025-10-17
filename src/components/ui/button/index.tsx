import { TouchableOpacity, Text } from "react-native";
import useStyles from "./style";
import { Ionicons } from "@expo/vector-icons";

interface ButtonProps {
  onPress: () => void;
  title: string;
  disapled?: boolean;
  varient?: "filled" | "outline" | "secondary";
  btnStyles?: object;
  btnTextStyles?: object;
  leftIcon?: string;
}

export default function Button({
  onPress,
  title,
  disapled = false,
  varient = "filled",
  btnStyles,
  btnTextStyles,
  leftIcon,
}: ButtonProps) {
  const styles = useStyles();
  return (
    
    <TouchableOpacity
      disabled={disapled}
      style={[
        styles.baseButton,
        varient === "outline"
          ? styles.outlinedButton
          : varient === "filled"
          ? styles.button
          : {},
        disapled ? styles.disabled : {},
        btnStyles,
      ]}
      onPress={onPress}
    >
      {leftIcon && (
        <Ionicons
          name={leftIcon as any}
          size={20}
          color={
            varient === "secondary"
              ? styles.secondaryButtonText.color
              : styles.buttonText.color
          }
        />
      )}
      <Text
        style={[
          varient === "secondary"
            ? styles.secondaryButtonText
            : styles.buttonText,
          btnTextStyles,
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}
