import { renderHook, waitFor } from "@testing-library/react-native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { useDeleteProduct } from "./useDeleteProduct";
import * as productApi from "@/api/products";
import authReducer from "@/store/slices/authSlice";
import UIReducer from "@/store/slices/UISlice";
import Toast from "react-native-toast-message";

jest.mock("@/api/products");
jest.mock("react-native-toast-message");

const mockProduct = {
  id: 1,
  title: "Test Product",
  category: "electronics",
  thumbnail: "https://example.com/1.jpg",
  isDeleted: true,
};

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });

const createMockStore = () =>
  configureStore({
    reducer: {
      auth: authReducer,
      UI: UIReducer,
    },
    preloadedState: {
      auth: {
        superadmin: true,
        user: null,
        token: "test-token",
        isAuthenticated: true,
      },
      UI: {
        deleteModal: {
          visible: true,
          productId: 1,
          productTitle: "Test Product",
        },
      },
    },
  });

const setup = (queryData?: any[], mockReturnValue?: any) => {
  const queryClient = createTestQueryClient();
  const store = createMockStore();

  if (queryData) {
    queryClient.setQueryData(["products", "all"], queryData);
  }

  if (mockReturnValue !== undefined) {
    (productApi.deleteProduct as jest.Mock).mockResolvedValue(mockReturnValue);
  }

  const wrapper = ({ children }: any) => (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </Provider>
  );

  const hook = renderHook(() => useDeleteProduct(), { wrapper });

  return { ...hook, queryClient, store };
};

describe("useDeleteProduct Hook", () => {
  describe("success cases", () => {
    it("should remove product from cache on successful delete", async () => {
      const { result, queryClient } = setup(
        [
          { id: 1, title: "Product 1", isDeleted: false },
          { id: 2, title: "Product 2", isDeleted: false },
        ],
        mockProduct
      );

      result.current.mutate(1);
      await waitFor(() => expect(result.current.isSuccess).toBe(true));

      const updated = queryClient.getQueryData(["products", "all"]) as any[];
      expect(updated).toHaveLength(1);
      expect(updated.find((p) => p.id === 1)).toBeUndefined();
    });

    it("should close delete modal on successful delete", async () => {
      const { result, store } = setup([mockProduct], mockProduct);

      result.current.mutate(1);

      await waitFor(() => {
        const state = store.getState();
        expect(state.UI.deleteModal.visisble).toBe(false);
        expect(state.UI.deleteModal.productId).toBe(0);
        expect(state.UI.deleteModal.productTitle).toBe("");
      });
    });
    it("should update all product queries on successful delete", async () => {
      const { result, queryClient } = setup(
        [
          { id: 1, title: "Product 1", isDeleted: false },
          { id: 2, title: "Product 2", isDeleted: false },
        ],
        mockProduct
      );

      queryClient.setQueryData(
        ["products", "all"],
        [
          { id: 1, title: "Product 1", isDeleted: false },
          { id: 2, title: "Product 2", isDeleted: false },
        ]
      );
      queryClient.setQueryData(
        ["products", "electronics"],
        [{ id: 1, title: "Product 1", isDeleted: false }]
      );

      result.current.mutate(1);

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      const allProducts = queryClient.getQueryData([
        "products",
        "all",
      ]) as any[];
      const categoryProducts = queryClient.getQueryData([
        "products",
        "electronics",
      ]) as any[];

      expect(allProducts.find((p) => p.id === 1)).toBeUndefined();
      expect(categoryProducts.find((p) => p.id === 1)).toBeUndefined();
    });
  });
  describe("error cases", () => {
    it("should show error toast on delete failure", async () => {
      const errorMessage = "Network error";
      const { result } = setup();

      (productApi.deleteProduct as jest.Mock).mockRejectedValue(
        new Error(errorMessage)
      );

      result.current.mutate(1);

      await waitFor(() => {
        expect(Toast.show).toHaveBeenCalledWith({
          type: "error",
          text1: "Failed to delete the product",
          text2: expect.any(String),
        });
      });
    });

    it("should rollback optimistic update on error", async () => {
      const queryClient = createTestQueryClient();
      const store = createMockStore();

      const originalData = [
        { id: 1, title: "Product 1", isDeleted: false },
        { id: 2, title: "Product 2", isDeleted: false },
      ];

      queryClient.setQueryData(["products", "all"], originalData);
      (productApi.deleteProduct as jest.Mock).mockRejectedValue(
        new Error("Delete failed")
      );

      const wrapper = ({ children }: any) => (
        <Provider store={store}>
          <QueryClientProvider client={queryClient}>
            {children}
          </QueryClientProvider>
        </Provider>
      );

      const { result } = renderHook(() => useDeleteProduct(), { wrapper });

      result.current.mutate(1);

      await waitFor(() => {
        expect(result.current.isError).toBe(true);
      });

      const data = queryClient.getQueryData(["products", "all"]);
      expect(data).toEqual(originalData);
    });
  });
  describe("optimistic behavior", () => {
    it("should optimistically update product as deleted", async () => {
      const queryClient = createTestQueryClient();
      const store = createMockStore();

      // Pre-populate cache with products
      queryClient.setQueryData(
        ["products", "all"],
        [
          { id: 1, title: "Product 1", isDeleted: false },
          { id: 2, title: "Product 2", isDeleted: false },
        ]
      );

      (productApi.deleteProduct as jest.Mock).mockImplementation(
        () => new Promise(() => {}) // Never resolves to test optimistic update
      );

      const wrapper = ({ children }: any) => (
        <Provider store={store}>
          <QueryClientProvider client={queryClient}>
            {children}
          </QueryClientProvider>
        </Provider>
      );

      const { result } = renderHook(() => useDeleteProduct(), { wrapper });

      result.current.mutate(1);

      await waitFor(() => {
        const data = queryClient.getQueryData(["products", "all"]) as any[];
        const deletedProduct = data.find((p) => p.id === 1);
        expect(deletedProduct?.isDeleted).toBe(true);
      });
    });
  });
});
