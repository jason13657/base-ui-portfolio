"use client";

import { useEffect, useId, useRef, useState } from "react";
import { TooltipProps } from "./types";
import { cn } from "@/lib/utils";
import { XIcon } from "../icons/XIcon";

export function Tooltip({
  content,
  position = "top",
  open: controlled,
  defaultOpen,
  onOpenChange,
  className,
}: TooltipProps) {
  const [uncontrolled, setUncontrolled] = useState(!!defaultOpen);
  const open = controlled ?? uncontrolled;

  const setOpen = (v: boolean) => {
    controlled === undefined ? setUncontrolled(v) : onOpenChange?.(v);
    if (controlled !== undefined) onOpenChange?.(v);
  };

  const id = useId();
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    if (open) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (!open) return;
      const t = e.target as Node;
      if (wrapperRef.current?.contains(t)) return;
      setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open]);

  const posBox =
    position === "top"
      ? "bottom-full left-1/2 -translate-x-1/2 mb-2"
      : position === "bottom"
      ? "top-full left-1/2 -translate-x-1/2 mt-2"
      : position === "left"
      ? "right-full top-1/2 -translate-y-1/2 mr-2"
      : "left-full top-1/2 -translate-y-1/2 ml-2";

  return (
    <div
      ref={wrapperRef}
      className={cn("relative inline-flex items-center", className)}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {/* Trigger: circle ? */}
      <button
        type="button"
        aria-describedby={open ? id : undefined}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        className="w-8 h-8 rounded-full border border-primary text-primary bg-surface grid place-items-center"
      >
        ?
      </button>

      {open && (
        <div id={id} role="tooltip" className={cn("absolute z-50", posBox)}>
          <div className="relative">
            {/* close */}
            <button
              onClick={() => setOpen(false)}
              aria-label="Close tooltip"
              className="absolute -right-3 -top-3 w-8 h-8 z-20 grid place-items-center rounded-md border border-primary text-primary bg-surface hover:bg-surface-hover active:bg-surface-active"
            >
              <XIcon />
            </button>

            <div className="bg-surface text-on-surface border border-primary rounded-sm shadow-md px-5 py-3 relative z-10 min-w-[200px]">
              {content}
            </div>

            {position === "top" && (
              <div className="pointer-events-none absolute -bottom-[7px] left-1/2 -translate-x-1/2 w-3 h-3 bg-primary rotate-45 z-0" />
            )}
            {position === "bottom" && (
              <div className="pointer-events-none absolute -top-[7px] left-1/2 -translate-x-1/2 w-3 h-3 bg-primary rotate-45 z-0" />
            )}
            {position === "left" && (
              <div className="pointer-events-none absolute top-1/2 -right-[7px] -translate-y-1/2 w-3 h-3 bg-primary rotate-45 z-0" />
            )}
            {position === "right" && (
              <div className="pointer-events-none absolute top-1/2 -left-[7px] -translate-y-1/2 w-3 h-3 bg-primary rotate-45 z-0" />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
