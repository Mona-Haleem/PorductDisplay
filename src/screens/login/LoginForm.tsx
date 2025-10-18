import Input from "@/components/UI/Input";
import { useCallback, useState } from "react";
import { KeyboardAvoidingView, Text } from "react-native";
import { useStyles } from "./styles";
import Button from "@/components/UI/Button";
import { Ionicons } from "@expo/vector-icons";
import { useLogin } from "../../hooks/Auth/useLogin";
import Loading from "@/components/UI/Loading/loading";
import { getFriendlyErrorMessage } from "@/utils/helpers";

function LoginForm() {
  const styles = useStyles();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const loginMutation = useLogin();

  const handelLogin = useCallback(() => {
    if (!username || !password) return;
    loginMutation.mutate({ username, password });
  }, [username, password, loginMutation]);

  return (
    <KeyboardAvoidingView style={styles.form}>
      {loginMutation.isError && (
        <Text style={styles.errorText}>
          {getFriendlyErrorMessage((loginMutation.error as Error).message)}
        </Text>
      )}
      {loginMutation.isPending && <Loading message="Logging in..." />}
      <Input
        label="username"
        value={username}
        validator={() => !!username}
        errorMessage="please enter your username"
        onChangeText={(e) => setUsername(e.trim())}
      />
      <Input
        label="passwoord"
        value={password}
        errorMessage="please enter your password"
        validator={() => !!password}
        onChangeText={(e) => setPassword(e.trim())}
        secureTextEntry={!showPassword}
        endIcon={
          <Ionicons
            name={showPassword ? "eye" : "eye-off"}
            size={24}
            color="gray"
          />
        }
        onEndIconPress={() => setShowPassword((prev) => !prev)}
      />
      <Button
        onPress={handelLogin}
        disapled={loginMutation.isPending || !username || !password}
        title="Sign in"
      />
    </KeyboardAvoidingView>
  );
}

export default LoginForm;
