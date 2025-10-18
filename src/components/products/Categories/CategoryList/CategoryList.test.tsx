import { waitFor } from "@testing-library/react-native";
import * as productApi from "@/api/products";

import { getCategoryIcon } from "@/utils/helpers";

jest.mock("@/api/products");
jest.mock("@/utils/helpers", () => ({
  getCategoryIcon: jest.fn(),
}));

const mockNavigate = jest.fn();
jest.mock("@react-navigation/native", () => ({
  useNavigation: () => ({
    navigate: mockNavigate,
  }),
}));


jest.mock("@expo/vector-icons", () => {
  const React = require("react");
  return {
    Ionicons: (props: any) => React.createElement("Ionicons", props),
  };
});

jest.mock('@/hooks/Product/useCategories', () => ({
    __esModule: true,
    default: () => ({
        data: mockCategories,
        error: null,
        isLoading: false,
        refetch: jest.fn(),
    }),
}));

const mockCategories = ["smartphones", "laptops", "fragrances"];

describe("CategoryList", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (productApi.getCategoriesList as jest.Mock).mockResolvedValue(
      mockCategories
    );
    (getCategoryIcon as jest.Mock).mockImplementation(
      (category) => `${category}-icon`
    );
  });

  it("renders all categories after fetching", async () => {
    waitFor(() => {
      expect(getCategoryIcon).toHaveBeenCalledWith("smartphones");
      expect(getCategoryIcon).toHaveBeenCalledWith("laptops");
    });
  });
});
