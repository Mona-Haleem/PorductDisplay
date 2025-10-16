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
}));
export default useStyles;
