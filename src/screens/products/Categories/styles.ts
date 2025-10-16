import { makeThemedStyles } from "@/utils/Theme/makeThemedStyles";

const useStyles = makeThemedStyles((theme) => ({
  container: {
    paddingHorizontal: 10,
    height: 65,
    marginVertical:10,
  },
  categoryIcon: {
    backgroundColor: theme.colors.primary,
    padding: 10,
    borderRadius: 10,
    margin: 5,

  },
  title:{
    paddingHorizontal:10,
    fontSize: 16,
    fontWeight: "bold",
    color: theme.colors.text,
    marginBottom: 10,
  }
}));

export default useStyles;
