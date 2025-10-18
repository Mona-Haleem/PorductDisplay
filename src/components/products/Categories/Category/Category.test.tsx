import React from "react";
import { fireEvent, render } from "@testing-library/react-native";
import Category from "./Category";
import { useNavigation } from "@react-navigation/native";
import { getCategoryIcon } from "@/utils/helpers";

jest.mock("@react-navigation/native", () => ({
  useNavigation: jest.fn(),
}));

jest.mock("@/utils/helpers", () => ({
  getCategoryIcon: jest.fn(),
}));

jest.mock("@expo/vector-icons", () => {
  const React = require("react");
  return {
    Ionicons: (props: any) => React.createElement("Ionicons", props),
  };
});

// Mock style hook
jest.mock("../styles", () => () => ({
  categoryIcon: { padding: 10 },
}));

describe("Category Component", () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useNavigation as jest.Mock).mockReturnValue({ navigate: mockNavigate });
    (getCategoryIcon as jest.Mock).mockReturnValue("phone-portrait-outline");
  });

  it("renders category icon correctly", () => {
    const { UNSAFE_getByType } = render(<Category category="smartphones" />);
    const icon = UNSAFE_getByType("Ionicons" as any);
    expect(icon.props.name).toBe("phone-portrait-outline");
    expect(icon.props.size).toBe(30);
    expect(icon.props.color).toBe("#333");
  });

  it("calls getCategoryIcon with correct category", () => {
    render(<Category category="laptops" />);
    expect(getCategoryIcon).toHaveBeenCalledWith("laptops");
  });

  it("navigates to CategoryProducts screen on press", () => {
    const navigate = jest.fn();
    (useNavigation as jest.Mock).mockReturnValue({ navigate });

    const { getByTestId } = render(<Category category="electronics" />);
    const button = getByTestId("category-button");

    fireEvent.press(button);

    expect(navigate).toHaveBeenCalledWith("CategoryProducts", {
      category: "electronics",
    });
  });
});
