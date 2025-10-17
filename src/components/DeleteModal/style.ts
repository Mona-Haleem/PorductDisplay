import { makeThemedStyles } from "@/utils/Theme/makeThemedStyles";

export const useStyles = makeThemedStyles((theme) => ({
  btn: {
    width: "100%",
  },
  btnText: {},
  lockIcon: {
    justifyContent: "center",
    alignItems: "center",
    color: theme.colors.secondary,
    backgroundColor: theme.colors.primary,
    padding: 10,
    borderRadius: 40,
    marginBottom: 20,
  },
  message: {
    fontSize:16,
    textAlign:"center",
    padding:5,
    lineHeight:25
  },
  highlight:{
    ...theme.textShadow,
    fontWeight:"bold",
    fontSize:18,
    color:theme.colors.primary
  }
}));
