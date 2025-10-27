import React from "react";
import { InputProps } from "./types";

const statusToBorderClass = (status: string) => {
  if (status === "error") {
    return "border-error";
  }
  if (status === "success") {
    return "border-primary";
  }
  return "border-surface-active";
};

export function Input({ label, message, status = "default", rightElement, className = "", ...rest }: InputProps) {
  return (
    <div className="flex flex-col gap-1">
      {label && <label className="text-on-surface">{label}</label>}
      <div className="relative">
        <input
          {...rest}
          className={[
            "px-3 py-2 rounded-md transition-colors w-full",
            "bg-surface text-on-surface",
            `hover:bg-surface-hover focus:bg-surface-active`,
            statusToBorderClass(status),
            className,
          ]
            .filter(Boolean)
            .join(" ")}
        />
        {rightElement && <div className="absolute inset-y-0 right-0 flex items-center pr-2">{rightElement}</div>}
      </div>
      {message && <span className={`text-sm ${status === "error" ? "text-error" : "text-on-surface"}`}>{message}</span>}
    </div>
  );
}
