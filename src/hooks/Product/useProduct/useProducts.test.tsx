import { renderHook, waitFor } from "@testing-library/react-native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import useProducts from "./useProducts";
import * as productApi from "@/api/products";

jest.mock("@/api/products");

const mockProducts = [
  {
    id: 1,
    title: "Product 1",
    category: "electronics",
    thumbnail: "https://example.com/1.jpg",
    isDeleted: false,
  },
  {
    id: 2,
    title: "Product 2",
    category: "electronics",
    thumbnail: "https://example.com/2.jpg",
    isDeleted: false,
  },
];

const setup = (queryClient?: QueryClient) => {
  const client =
    queryClient ||
    new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        staleTime: Infinity,
        refetchOnMount: false,
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
      },
      mutations: { retry: false },
    },
  });


  const wrapper = ({ children }: any) => (
    <QueryClientProvider client={client}>{children}</QueryClientProvider>
  );

  return { wrapper, client };
};

describe("useProducts Hook", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("fetches all products when no category is provided", async () => {
    (productApi.getProducts as jest.Mock).mockResolvedValue(mockProducts);
    const { wrapper } = setup();

    const { result } = renderHook(() => useProducts(), { wrapper });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(productApi.getProducts).toHaveBeenCalledTimes(1);
    expect(result.current.data).toEqual(mockProducts);
  });

  it("fetches products by category when category is provided", async () => {
    const category = "electronics";
    (productApi.getProductsByCategory as jest.Mock).mockResolvedValue(
      mockProducts
    );
    const { wrapper } = setup();

    const { result } = renderHook(() => useProducts(category), { wrapper });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(productApi.getProductsByCategory).toHaveBeenCalledWith(category);
    expect(result.current.data).toEqual(mockProducts);
  });

  it("uses different query keys for different categories", async () => {
    const { client, wrapper } = setup();

    renderHook(() => useProducts(), { wrapper });
    renderHook(() => useProducts("electronics"), { wrapper });

    const keys = client
      .getQueryCache()
      .getAll()
      .map((q) => q.queryKey);

    expect(keys).toContainEqual(["products", "all"]);
    expect(keys).toContainEqual(["products", "electronics"]);
  });

  it("returns loading state initially", () => {
    (productApi.getProducts as jest.Mock).mockImplementation(
      () => new Promise(() => {}) // never resolves
    );
    const { wrapper } = setup();

    const { result } = renderHook(() => useProducts(), { wrapper });

    expect(result.current.isLoading).toBe(true);
    expect(result.current.data).toBeUndefined();
  });

  it("handles errors correctly", async () => {
    const errorMessage = "Failed to fetch products";
    (productApi.getProducts as jest.Mock).mockRejectedValue(
      new Error(errorMessage)
    );
    const { wrapper } = setup();

    const { result } = renderHook(() => useProducts(), { wrapper });
    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(result.current.error?.message).toBe(errorMessage);
  });

  it("supports refetching data manually", async () => {
    (productApi.getProducts as jest.Mock).mockResolvedValue(mockProducts);
    const { wrapper } = setup();

    const { result } = renderHook(() => useProducts(), { wrapper });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    result.current.refetch();
    await waitFor(() =>
      expect(productApi.getProducts).toHaveBeenCalledTimes(2)
    );
  });

});
