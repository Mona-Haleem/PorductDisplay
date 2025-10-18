import { makeThemedStyles } from "@/Theme/makeThemedStyles";

export const useStyles = makeThemedStyles((theme) => ({
  btn: {
    width: "100%",
  },
  btnText: {},
  lockIcon: {
    justifyContent: "center",
    alignItems:"center",
    color: theme.colors.secondary,
    backgroundColor: theme.colors.primary,
    padding: 10,
    borderRadius: 40,
    marginBottom:20
  },
  
}));
