import { makeThemedStyles } from "@/Theme/makeThemedStyles";

export const useStyles = makeThemedStyles((theme) => ({
  container: {
    flex: 1,
    paddingHorizontal: 30,
    backgroundColor: theme.colors.background,
    justifyContent: "center",
  },
  header: {
    marginBottom: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: theme.colors.text,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    opacity: 0.6,
    color: theme.colors.text,
  },
  form: {
    alignItems: "center",
  },

  errorText: {
    color: theme.colors.error,
    fontSize: 14,
    marginLeft: 20,
    marginTop: 5,
  },
}));
