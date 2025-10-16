import { makeThemedStyles } from "@/utils/Theme/makeThemedStyles";

const useStyles = makeThemedStyles((theme) => ({
  container: {
    backgroundColor: "#ff6b6b",
    padding: 8,
    alignItems: "center",
  },
  text: {
    color: "white",
    fontWeight: "600",
  },
}));

export default useStyles;
