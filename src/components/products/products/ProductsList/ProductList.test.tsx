import { render, waitFor, fireEvent, act } from "@testing-library/react-native";
import * as productApi from "@/api/products";
import { renderWithProviders } from "@/utils/testUtils";
import ProductList from "./productsList";

jest.mock("@/api/products");

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

describe("ProductList", () => {
  beforeEach(() => jest.clearAllMocks());


  it("renders product cards correctly", async () => {
    (productApi.getProducts as jest.Mock).mockResolvedValue(mockProducts);

    const { getByText } = render(renderWithProviders(<ProductList />));

    await waitFor(() => {
      expect(getByText("iPhone 12")).toBeTruthy();
      expect(getByText("MacBook Pro")).toBeTruthy();
    });
  });

  it("supports pull-to-refresh", async () => {
    const { getByTestId } = render(renderWithProviders(<ProductList />));

    const list = getByTestId("products-flatlist");

    await waitFor(() =>
      expect(productApi.getProducts).toHaveBeenCalledTimes(1)
    );

    await act(async () => {
      fireEvent(list, "refresh");
      await waitFor(() =>
        expect(productApi.getProducts).toHaveBeenCalledTimes(2)
      );
    });
  });

  it("shows empty state when no products are returned", async () => {
    (productApi.getProducts as jest.Mock).mockResolvedValue([]);

    const { getByText } = render(renderWithProviders(<ProductList />));

    await waitFor(() => expect(getByText("No item found.")).toBeTruthy());
  });
});
