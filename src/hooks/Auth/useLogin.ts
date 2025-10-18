import { getMe, login } from "@/api/auth";
import { AppDispatch } from "@/store";
import {  setUser  } from "@/store/slices/authSlice";
import { getFriendlyErrorMessage } from "@/utils/helpers";
import { storage } from "@/utils/storaeg";
import { loginCredentials } from "@/types/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Toast from "react-native-toast-message";
import { useDispatch } from "react-redux";
import { setLoadingState } from "@/store/slices/UISlice";

export function useLogin() {
  const queryClient = useQueryClient();

  const dispatch = useDispatch<AppDispatch>();
  return useMutation({
    mutationFn: (credentials: loginCredentials) => login(credentials),
    onMutate:()=>{
      dispatch(setLoadingState(true));
    },
    onSuccess: async (data) => {
      //console.log("Login successful:", data);
      if (data?.accessToken) {
        const userData = await getMe(data.accessToken);
        storage.set("accessToken", data.accessToken);
        dispatch(setUser({...data,source:"loginScreen"}));
        queryClient.setQueryData(["userData"], userData);

        queryClient.invalidateQueries({ queryKey: ["userData"] });
      }
    },
    onError: (error) => {
      Toast.show({
        type: "error",
        text1: getFriendlyErrorMessage(error.message) || "Session Expired",
        text2: "Please try again later.",
      });
    },onSettled:()=>{
      dispatch(setLoadingState(false));
    }
  });
}
