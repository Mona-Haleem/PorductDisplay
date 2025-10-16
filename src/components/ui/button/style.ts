import { makeThemedStyles } from "@/utils/Theme/makeThemedStyles";

const styles = makeThemedStyles((theme) => ({
  button: {
    marginTop: 20,
    width: "50%",
    backgroundColor: theme.colors.primary,
    paddingVertical: 10,
    borderRadius: 10,
    alignSelf: "center",
    elevation: 2,
  },
  secondaryButton:{
    marginTop: 20,
    paddingVertical: 10,
    alignSelf: "center",
  },
  buttonText: {
    color: theme.colors.text,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20,
  },
  secondaryButtonText:{
    opacity:0.6,
    color: theme.colors.text,
    textAlign: "center",
    fontSize: 16,
  }
}));

export default styles;
