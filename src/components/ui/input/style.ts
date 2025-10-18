import { makeThemedStyles } from "@/Theme/makeThemedStyles";

export const useStyles = makeThemedStyles((theme) => ({
  container: {
    marginBottom: 25,
  },
  label: {
    textTransform: "capitalize",
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    backgroundColor: theme.colors.secondary,
    borderRadius: 10,
    paddingHorizontal: 20,
    elevation: 2,
    borderWidth:1,
    borderColor: theme.colors.secondary,
  },
  
  input: {
    paddingVertical: 10,
    paddingRight: 20,
    color: theme.colors.text,
    flex: 1,
    fontSize: 18,
    width: "100%",
  
  },
  iconContainer: {
    position: "absolute",
    right: 0,
    paddingHorizontal: 10,
  },
  errorText: {
    color: theme.colors.error,
    fontSize: 14,
    marginLeft: 20,
    marginTop: 5,
  },
  focused:{
    borderWidth: 1,
    borderColor: theme.colors.primary,
    backgroundColor: theme.colors.background,
    elevation: 3,
  }
}));
