import React from "react";
import { ButtonProps } from "./types";

const variantToClass = (variant: string) => {
  switch (variant) {
    case "primary":
      return "bg-primary text-on-primary hover:bg-primary-hover active:bg-primary-active";
    case "secondary":
      return "bg-secondary text-on-secondary hover:bg-secondary-hover active:bg-secondary-active";
    case "surface":
      return "bg-surface text-on-surface hover:bg-surface-hover active:bg-surface-active";
    case "tertiary":
      return "bg-tertiary text-on-tertiary hover:bg-tertiary-hover active:bg-tertiary-active";
    case "error":
      return "bg-error text-on-error";
    default:
      return "bg-primary text-on-primary hover:bg-primary-hover active:bg-primary-active";
  }
};

export function Button({ variant = "primary", fullWidth = false, className = "", ...rest }: ButtonProps) {
  return (
    <button
      {...rest}
      className={[
        variantToClass(variant),
        fullWidth ? "w-full" : "",
        "px-4 py-2 rounded-sm font-medium transition-colors",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    />
  );
}
