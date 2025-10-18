import { makeThemedStyles } from "@/Theme/makeThemedStyles";

const useStyles = makeThemedStyles((theme) => ({
  container: {
    paddingBottom: 20,
    marginVertical: 0,
    marginHorizontal: "auto",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 1,
    justifyContent: "flex-start",
    alignItems: "flex-end",
    paddingLeft: 10,
  },
  title: {
    textTransform: "capitalize",
    marginVertical: 10,

    fontSize: 16,
    fontWeight: "bold",
    color: theme.colors.text,
  },
  highlight: {
    ...theme.textShadow,
    marginRight: 3,
    color: theme.colors.primary,
    textTransform: "capitalize",
    fontSize: 18,
    fontWeight: "bold",
  },
  row: {
    gap: 10,
  },
  productCard: {
    height: 180,
    width: 150,
    backgroundColor: theme.colors.secondary,
    elevation: 2,
    borderRadius: 20,
    margin: 10,

    overflow: "hidden",
  },
  img: {
    width: "100%",
    height: 100,
    backgroundColor:"#F5F5F5"
  },
  productData: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
  ProductTitle: {
    alignSelf: "flex-start",
    fontSize: 16,
    fontWeight: "bold",
    color: theme.colors.text,
    marginBottom: 10,
    maxWidth: "70%",
  },
  deleteButton: {
    alignSelf: "flex-end",
    paddingVertical: 6,
  },
  icon: {
    color: theme.colors.primary,
  },
}));

export default useStyles;
