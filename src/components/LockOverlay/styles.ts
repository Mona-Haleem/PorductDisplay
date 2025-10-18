import { makeThemedStyles } from "@/utils/Theme/makeThemedStyles";

export const useStyles = makeThemedStyles((theme) => ({
  container: {
    flex: 1,
    position :"absolute",
   height:"100%",
   width:"100%",
    top: 0, left: 0
   , //backgroundColor: "#df1010ff",
  },

}));
