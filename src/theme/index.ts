import { MD3LightTheme, MD3DarkTheme } from "react-native-paper"
import type { MD3Theme } from "react-native-paper"

// Define custom colors
const customColors = {
  primary: "#3b82f6", // Blue
  secondary: "#10b981", // Green
  tertiary: "#f59e0b", // Amber
  error: "#ef4444", // Red
}

// Create custom light theme
export const lightTheme: MD3Theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    ...customColors,
    background: "#f9fafb",
    surface: "#ffffff",
    onSurface: "#1f2937",
    surfaceVariant: "#f3f4f6",
    onSurfaceVariant: "#4b5563",
    outline: "#9ca3af",
  },
}

// Create custom dark theme
export const darkTheme: MD3Theme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    ...customColors,
    background: "#111827",
    surface: "#1f2937",
    onSurface: "#f9fafb",
    surfaceVariant: "#374151",
    onSurfaceVariant: "#d1d5db",
    outline: "#6b7280",
  },
}

// Default theme
export const theme = lightTheme

// Typography
export const typography = {
  fontFamily: {
    regular: "Inter_400Regular",
    medium: "Inter_500Medium",
    semiBold: "Inter_600SemiBold",
    bold: "Inter_700Bold",
  },
  fontSize: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    "2xl": 24,
    "3xl": 30,
  },
}

// Spacing
export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  "2xl": 48,
  "3xl": 64,
}

// Border radius
export const borderRadius = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
}
