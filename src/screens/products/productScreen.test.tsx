import { render, fireEvent, waitFor } from "@testing-library/react-native";
import * as productApi from "@/api/products";
import ProductScreen from "./index";
import { renderWithProviders } from "@/utils/testUtils";

jest.mock("@/api/products");
jest.mock("@/hooks/UI/UseSetScreen", () => ({
  __esModule: true,
  default: jest.fn(),
}));
jest.mock('expo-asset', () => ({
  Asset: {
    fromModule: () => ({
      downloadAsync: jest.fn(),
      localUri: 'mocked_uri',
    }),
  },
}));

const mockProducts = [
  {
    id: 1,
    title: "iPhone 12",
    category: "smartphones",
    thumbnail: "",
    isDeleted: false,
  },
  {
    id: 2,
    title: "MacBook Pro",
    category: "laptops",
    thumbnail: "",
    isDeleted: false,
  },
];

const mockCategories = ["smartphones", "laptops"];

describe("ProductScreen Integration Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (productApi.getProducts as jest.Mock).mockResolvedValue(mockProducts);
    (productApi.getCategoriesList as jest.Mock).mockResolvedValue(
      mockCategories
    );
  });

  it("renders correctly with all sections", async () => {
    const { getByText } = render(renderWithProviders(<ProductScreen />));

    await waitFor(() => {
      expect(getByText("Welcome,")).toBeTruthy();
      expect(getByText("Categories")).toBeTruthy();
      expect(getByText("Products")).toBeTruthy();
    });
  });

  it("fetches products and categories once on mount", async () => {
    render(renderWithProviders(<ProductScreen />));

    await waitFor(() => {
      expect(productApi.getProducts).toHaveBeenCalledTimes(1);
      expect(productApi.getCategoriesList).toHaveBeenCalledTimes(1);
    });
  });

  it("should show error message when products fetch fails", async () => {
    (productApi.getProducts as jest.Mock).mockRejectedValue(
      new Error("Network error")
    );

    const { getByText } = render(renderWithProviders(<ProductScreen/>));

    await waitFor(() => {
      expect(getByText("Network error")).toBeTruthy();
    });
  });

  it("should handle categories error while showing products", async () => {
    (productApi.getCategoriesList as jest.Mock).mockRejectedValue(
      new Error("Categories failed")
    );

    const { getByText } = render(renderWithProviders(<ProductScreen/>));

    await waitFor(() => {
      expect(getByText("iPhone 12")).toBeTruthy();
      expect(getByText("Categories failed")).toBeTruthy();
    });
  });

  it("should show loading states for both lists initially", () => {
    (productApi.getProducts as jest.Mock).mockImplementation(
      () => new Promise(() => {})
    );
    (productApi.getCategoriesList as jest.Mock).mockImplementation(
      () => new Promise(() => {})
    );

    const { getByText } = render(renderWithProviders(<ProductScreen/>));

    expect(getByText(/Loading Producs.../i)).toBeTruthy();
    expect(getByText(/Loading Categories.../i)).toBeTruthy();
  });
});
