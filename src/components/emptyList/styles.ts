import { makeThemedStyles } from "@/utils/Theme/makeThemedStyles";

const useStyles = makeThemedStyles((theme) => ({

  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    fontSize: 16,
  },
  retryButton: {
    backgroundColor: '#2f95dc',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 6,
  },
  retryText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#999',
  },

}));

export default useStyles;
