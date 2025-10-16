import { makeThemedStyles } from "@/utils/Theme/makeThemedStyles";

const useStyles = makeThemedStyles((theme) => ({
  container: {
    paddingBottom: 20,
    marginVertical:10,
  },
  title:{
    marginTop:10,
    paddingHorizontal:10,
    fontSize: 16,
    fontWeight: "bold",
    color: theme.colors.text,
    marginBottom: 10,
  },
  row: {
    justifyContent: "space-between",
  },
  productCard: {
    height: 180,
    width: 150,
    backgroundColor: theme.colors.secondary,
    elevation: 2,
    borderRadius: 20,
    margin: 5,
    overflow: "hidden",
  },
  img: {
    width: "100%",
    height: 100,
  },
  productData:{
    flex:1,
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    padding:10
  },
  ProductTitle: {
    alignSelf:"flex-start",
    fontSize: 16,
    fontWeight: "bold",
    color: theme.colors.text,
    marginBottom: 10,
    maxWidth:'70%',

  },
  deleteButton: {
    alignSelf: "flex-end",
    paddingVertical: 6,
  },
}));

export default useStyles;
