import { makeThemedStyles } from "@/Theme/makeThemedStyles";

const styles = makeThemedStyles((theme) => ({
  baseButton: {
    marginTop: 20,
    paddingVertical: 10,
    flexDirection: "row",
    borderRadius: 10,
    justifyContent: "center",
    gap: 10,
  },
  button: {
    width: "50%",
    backgroundColor: theme.colors.primary,
    borderWidth:1,
    borderColor:theme.colors.primary,
    ...theme.shadow,
  },
  outlinedButton: {
    borderColor: theme.colors.primary,
    borderWidth: 2,
    
  },
  buttonText: {
    color: theme.colors.text,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20,
  },
  secondaryButtonText: {
    opacity: 0.6,
    color: theme.colors.text,
    textAlign: "center",
    fontSize: 16,
  },
  disabled: {
    backgroundColor: theme.colors.secondary,
    opacity: 0.6,
    elevation: 0,
  },
}));

export default styles;
