export interface ThemeColors {
  background: string;
  text: string;
  primary: string;
  secondary: string;
}

export interface AppTheme {
  mode: "light" | "dark";
  colors: ThemeColors;
}

export const lightTheme: AppTheme = {
  mode: "light",
  colors: {
    background: "#fff",
    primary: "#fcf",
    text: "#333",
    secondary: "#5de",
  },
};

export const darkTheme: AppTheme = {
  mode: "dark",
  colors: {
    background: "#333",
    primary: "#fcf",
    text: "#fff",
    secondary: "#5de",
  },
};
