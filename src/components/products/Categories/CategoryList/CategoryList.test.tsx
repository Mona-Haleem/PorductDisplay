import { render, waitFor } from "@testing-library/react-native";
import CategoryList from "./CategoryList";
import { NavigationContainer } from "@react-navigation/native";
import { getCategoryIcon } from "@/utils/helpers";

jest.mock("@/utils/helpers", () => ({
  getCategoryIcon: jest.fn(),
}));

jest.mock('@/hooks/Product/useCategories', () => ({
  __esModule: true,
  default: () => ({
      data: ["smartphones", "laptops", "fragrances"],
      error: null,
      isLoading: false,
      refetch: jest.fn(),
  }),
}));

describe("CategoryList", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  afterEach(() => {
  jest.runOnlyPendingTimers();
  jest.useRealTimers();
});


  it("renders all categories after fetching", async () => {
    render(
      <NavigationContainer>
        <CategoryList />
      </NavigationContainer>
    );

    await waitFor(() => {
      expect(getCategoryIcon).toHaveBeenCalledWith("smartphones");
      expect(getCategoryIcon).toHaveBeenCalledWith("laptops");
      expect(getCategoryIcon).toHaveBeenCalledWith("fragrances");
    });
  });
});
