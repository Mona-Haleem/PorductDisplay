import { useStyles } from "./styles";
import { LinearGradient } from "expo-linear-gradient";
import { useTheme } from "@/utils/Theme/ThemeContext";
import Header from "./Header";
import LoginForm from "./LoginForm";

function LoginScreen() {
  const styles = useStyles();
  const { theme } = useTheme();

  return (
    <LinearGradient
      colors={theme.gradient}
      locations={[0, 0.4, 0.6, 1]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.container}
    >
      <Header />

      <LoginForm />
    </LinearGradient>
  );
}

export default LoginScreen;
