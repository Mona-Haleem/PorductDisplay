import { setCurrentScreen } from "@/store/slices/authSlice";
import { resetTimer } from "@/store/slices/InactivityTimerSlice";
import { handelTimerReset } from "@/utils/helpers";
import {
  useFocusEffect,
  useNavigationState,
  useRoute,
} from "@react-navigation/native";
import { useCallback } from "react";
import { useDispatch } from "react-redux";

const useSetScreen = () => {
  const dispatch = useDispatch();
  useFocusEffect(
    useCallback(() => {
      dispatch(resetTimer(handelTimerReset(dispatch)));
    }, [dispatch])
  );
};

export default useSetScreen;
