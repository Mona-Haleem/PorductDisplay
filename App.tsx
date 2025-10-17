import MainNavigator from "@/navigation/MainNavigator";
import { store } from "@/store";
import { ThemeProvider } from "@/utils/Theme/ThemeContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Toast, { BaseToast, ErrorToast } from "react-native-toast-message";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";

import { Provider } from "react-redux";
import { mmkvPersister } from "@/utils/storage";
import { OfflineIndicator } from "@/components/offlineIndicator";
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 60 * 24,
    },
  },
});

const toastConfig = {
  info: (props: any) => (
    <BaseToast {...props} style={{ borderLeftColor: "#007AFF" }} />
  ),
  error: (props: any) => (
    <ErrorToast {...props} style={{ borderLeftColor: "red" }} />
  ),
};

export default function App() {
  return (
    <ThemeProvider>
      <Provider store={store}>
        <PersistQueryClientProvider
          client={queryClient}
          persistOptions={{
            persister: mmkvPersister,
            dehydrateOptions: {
              shouldDehydrateQuery: (query) => query.state.status === "success",
            },
          }}
        >
          <QueryClientProvider client={queryClient}>
            <OfflineIndicator />

            <MainNavigator />
            <Toast config={toastConfig} />
          </QueryClientProvider>
        </PersistQueryClientProvider>
      </Provider>
    </ThemeProvider>
  );
}
