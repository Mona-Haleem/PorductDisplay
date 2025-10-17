import { login } from "@/api/auth";
import { AppDispatch } from "@/store";
import { setUser, toggleBiometricModal } from "@/store/slices/authSlice";
import { storage } from "@/utils/storage";
import { loginCredentials } from "@/utils/types/auth";
import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";

export function useLogin() {
  const dispatch = useDispatch<AppDispatch>();
  return useMutation({
    mutationFn: (credentials: loginCredentials) => login(credentials),
    onSuccess: (data) => {
      //console.log("Login successful:", data);
      if (data?.accessToken) {
        storage.set("accessToken", data.accessToken);
        dispatch(setUser(data));
        //dispatch(toggleBiometricModal(true));
      }
    },
    onError: (error) => {
      //console.log("Login failed:", error);
    },
  });
}
