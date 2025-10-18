import { makeThemedStyles } from "@/Theme/makeThemedStyles";

const useStyles = makeThemedStyles((theme) => ({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 10,
  },
  userContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingRight: 10,
  },
  avatar: {
    marginRight: 10,
    height: 45,
    width: 45,
    borderRadius: 22.5,
    overflow: "hidden",
    backgroundColor: "#f5f5f5",
    borderColor: theme.colors.primary,
    borderWidth: 1.5,
    elevation: 2,
  },
  img: {
    height: "100%",
    width: "100%",
  },
  welcome: {
    color: theme.colors.text,
    fontSize: 16,
  },
  username: {
    textTransform: "capitalize",
    fontSize: 20,
    fontWeight: "bold",
    color: theme.colors.primary,
    ...theme.textShadow
  },
  theme: {
    borderColor: theme.colors.primary,
    borderWidth: 1,
    backgroundColor: "#f5f5f5",
    elevation: 2,
    borderRadius: 20,
    height: 40,
    width: 40,
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
  }
}));

export default useStyles;
