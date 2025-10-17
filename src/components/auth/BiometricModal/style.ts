import { makeThemedStyles } from "@/utils/Theme/makeThemedStyles";

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
  //    container: {
  //     flex: 1,
  //     justifyContent: "center",
  //     alignItems: "center",
  //     backgroundColor: "rgba(0,0,0,0.5)",
  //   },
  //   modal: {
  //     width: "85%",
  //     backgroundColor: "#fff",
  //     borderRadius: 12,
  //     padding: 25,
  //     alignItems: "center",
  //   },
  //   title: {
  //     fontSize: 20,
  //     fontWeight: "bold",
  //     marginBottom: 15,
  //   },
  //   input: {
  //     width: "100%",
  //     borderWidth: 1,
  //     borderColor: "#ccc",
  //     borderRadius: 6,
  //     padding: 12,
  //     marginVertical: 10,
  //   },
  //   error: {
  //     color: "red",
  //     marginBottom: 10,
  //   },
  //   choiceButton: {
  //     width: "100%",
  //     padding: 15,
  //     borderRadius: 8,
  //     alignItems: "center",
  //     marginVertical: 8,
  //   },
  //   primaryChoice: {
  //     backgroundColor: "#4CAF50",
  //   },
  //   secondaryChoice: {
  //     backgroundColor: "#ddd",
  //   },
  //   choiceText: {
  //     fontSize: 16,
  //     fontWeight: "600",
  //     color: "#fff",
  //   },
  //   submitButton: {
  //     backgroundColor: "#4CAF50",
  //     paddingVertical: 12,
  //     paddingHorizontal: 30,
  //     borderRadius: 8,
  //     marginTop: 10,
  //   },
  //   submitText: {
  //     color: "#fff",
  //     fontWeight: "600",
  //     fontSize: 16,
  //   },
}));
