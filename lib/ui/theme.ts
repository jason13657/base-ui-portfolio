export type ColorVariant = "primary" | "secondary" | "surface" | "tertiary" | "error";

export type ColorState = "default" | "hover" | "active";

export interface ThemeColor {
  default: string;
  hover: string;
  active: string;
  on?: string; // e.g. text color on background
}

export interface Theme {
  colors: Record<ColorVariant, ThemeColor>;
  borderRadius: string;
  fontSize: Record<"sm" | "md" | "lg", string>;
}
