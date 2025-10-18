import { useStyles } from "./styles";
import Header from "./Header";
import LoginForm from "./LoginForm";
import Gradient from "@/components/ui/Gradient";

function LoginScreen() {
  const styles = useStyles();
  return (
    <Gradient style={styles.container}>
      <Header />

      <LoginForm />
    </Gradient>
  );
}

export default LoginScreen;
