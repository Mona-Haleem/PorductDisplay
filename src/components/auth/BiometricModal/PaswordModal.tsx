import { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { useQueryClient } from "@tanstack/react-query";
import Button from "@/components/ui/button";
import { Ionicons } from "@expo/vector-icons";
import Input from "@/components/ui/input";
import { toggleBiometricModal } from "@/store/slices/UISlice";

const PasswordModal: React.FC = () => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);  
  const [error, setError] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const queryClient = useQueryClient();
  const cachedData = queryClient.getQueryData(["userData"]);
 
  const handlePasswordSubmit = useCallback(() => {
      console.log(password,'---',cachedData?.password)
    if (password === cachedData?.password) {
      dispatch(toggleBiometricModal(false));
      setError("");
    } else {
      setError("Password incorrect");
    }
  }, [password,cachedData,dispatch, setError]);
 
  return (
    <>
      <Input
        label="passwoord"
        value={password}
        errorMessage={error}
        isInvalid={!!error}
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
        onPress={handlePasswordSubmit}
        disapled={!password}
        title="Sign in"
      />
    </>
  );
};

export default PasswordModal;
