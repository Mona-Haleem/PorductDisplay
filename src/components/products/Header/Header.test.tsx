import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import Header from "./Header";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/store/slices/authSlice";
import UIReducer from "@/store/slices/UISlice";
import { ThemeProvider, useTheme } from "@/Theme/ThemeContext";

jest.mock("@expo/vector-icons", () => {
  const React = require("react");
  return {
    Ionicons: (props: any) => React.createElement("Ionicons", props),
  };
});




jest.mock("expo-image", () => {
  const React = require("react");
  return {
    Image: (props: any) => React.createElement("Image", props),
  };
});



jest.mock("@/Theme/ThemeContext", () => {
  const actual = jest.requireActual("@/Theme/ThemeContext");
  return {
    ...actual,
    useTheme: jest.fn(),
    ThemeProvider: ({ children }: any) => <>{children}</>,
  };
});

describe("Header Component", () => {
  const mockUser = {
    id: 1,
    username: "emilys",
    email: "emily@example.com",
    image: "https://dummyjson.com/icon/emilys/128",
  };

  const createStore = () =>
    configureStore({
      reducer: { auth: authReducer, UI: UIReducer },
      preloadedState: {
        auth: {
          user: mockUser,
          token: "test-token",
          isAuthenticated: true,
          superadmin: false,
        },
        UI: {
          showDeleteModal: { visisble: false, productId: 0, productTitle: "" },
        },
      },
    });

  const renderHeader = (
    themeMode: "light" | "dark" = "light",
    toggleTheme = jest.fn()
  ) => {
    (useTheme as jest.Mock).mockReturnValue({
      theme: {
        mode: themeMode,
        colors: { primary: themeMode === "dark" ? "#fff" : "#000" },
      },
      toggleTheme,
    });

    const store = createStore();

    return render(
      <Provider store={store}>
        <ThemeProvider>
          <Header />
        </ThemeProvider>
      </Provider>
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders user information correctly", () => {
    const { getByText, getByTestId } = renderHeader();

    expect(getByText("Welcome,")).toBeTruthy();
    expect(getByText(/emilys!/)).toBeTruthy();
    expect(getByTestId("user-avatar")).toBeTruthy();
  });

  it("renders sun icon when in light mode", () => {
    const { getByTestId } = renderHeader("light");
    const icon = getByTestId("theme-icon");
    expect(icon.props.name).toBe("sunny");
  });

  it("renders moon icon when in dark mode", () => {
    const { getByTestId } = renderHeader("dark");
    const icon = getByTestId("theme-icon");
    expect(icon.props.name).toBe("moon");
  });

  it("calls toggleTheme when the theme button is pressed", () => {
    const mockToggle = jest.fn();
    const { getByTestId } = renderHeader("light", mockToggle);

    const button = getByTestId("theme-toggle");
    fireEvent.press(button);

    expect(mockToggle).toHaveBeenCalledTimes(1);
  });

  it("applies correct icon color based on theme", () => {
    const { getByTestId } = renderHeader("dark");
    const icon = getByTestId("theme-icon");
    expect(icon.props.color).toBe("#fff");
  });
});
