import Input from "@/components/UI/Input";
import { useState } from "react";
import { KeyboardAvoidingView } from "react-native";
import { useStyles } from "./styles";
import Button from "@/components/UI/Button";
import { Ionicons } from "@expo/vector-icons";

function LoginForm() {

  const styles = useStyles();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  return (

      <KeyboardAvoidingView style={styles.form}>
        <Input
          label="username"
          value={username}
          onChangeText={(e) => setUsername(e)}
        />
        <Input
          label="passwoord"
          value={password}
          onChangeText={(e) => setPassword(e)}
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
          onPress={() => {
            console.log("Logging in with", { username, password });
          }}
          title="Sign in"
        />
        {/* <Button
          varient="secondary"
          onPress={() => {}}
          title="Don't have an account? sign up"
        /> */}
      </KeyboardAvoidingView>
  );
}


export default LoginForm