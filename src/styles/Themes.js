import { extendTheme, ThemeOverride } from "@chakra-ui/react";

const colors = {
  black: {
    400: "#222222",
    450: "#252525",
    500: "#000",
  },
  gray: {
    50: "#fff",
    100: "#f2f2f2",
    150: "#f4f4f4",
    200: "#e7e7e7",
    250: "#eee",
    300: "#ddd",
    400: "#ccc",
    500: "#999",
    600: "#858585",
    700: "#888",
    800: "#666",
  },
  blue: {
    100: "#f2f9ff",
    150: "#56d2e9",
    200: "#3be8ed",
    300: "rgba(0, 114, 222, 0.6)",
    400: "#0072de",
    450: "rgba(0, 94, 183, 0.1)",
    500: "#005eb7",
    600: "rgba(0, 114, 222, 0.5)",
    700: "#0072de",
    750: "#007bff",
    800: "rgb(44, 44, 100)",
  },
  red: {
    400: "rgba(255, 73, 73, 0.8)",
    500: "#ff6565",
    600: "#ff4949",
  },
  yellow: {
    500: "#ffb800",
  },
  green: {
    500: "#96d450",
  },
  purple: {
    500: "#b060c3",
  },
  white: {
    100: "#FFFFFF",
  },
};

const themes = {
  fonts: {
    heading: "OpenSans, sans-serif",
    body: "OpenSans, sans-serif",
  },

  colors: {
    colors,
  },
};

const extendedTheme = extendTheme(themes);

export default extendedTheme;
