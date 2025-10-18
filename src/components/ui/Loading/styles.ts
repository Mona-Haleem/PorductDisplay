import { makeThemedStyles } from "@/Theme/makeThemedStyles";

const useStyles = makeThemedStyles((theme) => ({
container: {
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  message: {
    marginTop: 8,
    fontSize: 14,
    color: "#333",
  },

}))

export default useStyles;