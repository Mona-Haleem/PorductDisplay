import { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { toggleBiometricModal } from "@/store/slices/authSlice";
import { useQueryClient } from "@tanstack/react-query";
import Button from "@/components/UI/Button";
import { Ionicons } from "@expo/vector-icons";
import Input from "@/components/UI/Input";

const PasswordModal: React.FC = () => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);  
  const [error, setError] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const queryClient = useQueryClient();
  const cachedData = queryClient.getQueryData(["userData"]);
  console.log('pass',password);
  const handlePasswordSubmit = useCallback(() => {
      console.log(password,'---',cachedData?.password)
    if (password === cachedData?.password) {
      dispatch(toggleBiometricModal(false));
      setError("");
      //console.log('correctpass')
    } else {
    //console.log('falsePass',error)
      setError("Password incorrect");
    }
  }, [password,cachedData,dispatch, setError]);
//console.log('isinvalid',!!error,error)
 
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
