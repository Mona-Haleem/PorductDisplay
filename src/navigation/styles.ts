import { makeThemedStyles } from "@/utils/Theme/makeThemedStyles";

const useStyles = makeThemedStyles((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  tabBarStyle: {
    height: 60,
    backgroundColor: theme.colors.background,
    elevation: 5,
  },
  activeTintColor: {
    color: theme.colors.primary,
  },
  loadingScreen: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
}));
export default useStyles;
