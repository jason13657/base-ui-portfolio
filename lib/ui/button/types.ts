export type ButtonVariant = "primary" | "secondary" | "surface" | "tertiary" | "error";
export type ButtonState = "default" | "hover" | "active";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  state?: ButtonState;
  disabled?: boolean;
  fullWidth?: boolean;
  icon?: React.ReactNode;
}
