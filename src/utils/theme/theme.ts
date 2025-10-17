export interface ThemeColors {
  background: string;
  text: string;
  textLight: string;
  primary: string;
  secondary: string;
  error: string;
}
export interface ShadowProps {
  shadowColor: string;
  shadowOffset: { width: number; height: number };
  shadowOpacity: number;
  shadowRadius: number;
  elevation: number;
}
export interface AppTheme {
  mode: "light" | "dark";
  colors: ThemeColors;
  gradient: readonly string[];
  shadow: ShadowProps;
}

export const lightTheme: AppTheme = {
  mode: "light",
  gradient: ["#ffccff5f", "#fff", "#fff", "#ffccff5f"] as const,
  colors: {
    background: "#fff",
    primary: "#fcf",
    secondary: "#f5f5f5",
    error: "#ff4d4f",
    text: "#333",
    textLight: "#ddd",
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
};

export const darkTheme: AppTheme = {
  mode: "dark",
  gradient: ["#ffccff5e", "#333", "#333", "#ffccffe5"],
  colors: {
    background: "#333",
    primary: "#fcf",
    secondary: "#f5f5f5",
    text: "#fff",
    error: "#ff4d4f",
    textLight: "#ddd",
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 10,
  },
};
