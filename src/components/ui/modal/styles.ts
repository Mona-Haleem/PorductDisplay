import { makeThemedStyles } from "@/utils/Theme/makeThemedStyles";

export const useStyles = makeThemedStyles((theme) => ({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.7)",
  },
  modal: {
    width: "85%",
    backgroundColor: "#fff",
    borderRadius: 12,
    alignItems: "center",
    elevation: 3,
    overflow: "hidden",
  },
  gradient: {
    alignItems:"center",
    hight: "100%",
    width: "100%",
    padding: 25,
  },
  closeBtn: {
    alignSelf: "flex-end",
    justifyContent: "flex-start",
  },
}));
