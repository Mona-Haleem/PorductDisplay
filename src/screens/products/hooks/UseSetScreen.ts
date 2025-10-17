import { setCurrentScreen } from "@/store/slices/authSlice";
import { useFocusEffect, useNavigationState, useRoute } from "@react-navigation/native";
import { useCallback } from "react";
import { useDispatch } from "react-redux";

const useSetScreen = () => {
  const dispatch = useDispatch();
  const state = useNavigationState((state:any) => state);

  useFocusEffect(
    useCallback(() => {
      const routes = state.routes;
      const activeIndex = state.index;
      const currentRoute = routes[activeIndex];
      const previousRoute = routes[activeIndex - 1];
     
      dispatch(setCurrentScreen(currentRoute?.name));
      return () => dispatch(setCurrentScreen(previousRoute?.name||""));

    }, [dispatch, state])
  );

};

export default useSetScreen;
