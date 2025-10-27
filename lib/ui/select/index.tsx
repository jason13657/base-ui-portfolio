"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { SelectControlProps } from "./types";
import { cn } from "@/lib/utils";
import { ChevronDown } from "../icons/ChevronDown";
import { CheckIcon } from "../icons/Check";

/** ===== Component ===== */
export function SelectControl({
  variant,
  label,
  options,
  value,
  onChange,
  placeholder = "Select…",
  className = "",
}: SelectControlProps) {
  if (variant === "chips") {
    return <ChipsSelect label={label} options={options} value={value} onChange={onChange} className={className} />;
  }
  return (
    <DropdownSelect
      label={label}
      options={options}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={className}
    />
  );
}

/** ===== Chips variant ===== */
function ChipsSelect({
  label,
  options,
  value,
  onChange,
  className,
}: Omit<SelectControlProps, "variant" | "placeholder">) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {label && <span className="text-on-surface">{label}</span>}
      <div className="flex flex-wrap gap-3">
        {options.map((opt) => {
          const selected = opt.value === value;
          return (
            <button
              key={opt.value}
              type="button"
              disabled={opt.disabled}
              onClick={() => onChange?.(opt.value)}
              className={cn(
                "px-4 py-2 rounded-sm border transition-colors",
                "focus:outline-none focus:ring-2 focus:ring-primary/40",
                selected
                  ? "bg-primary text-on-primary border-primary"
                  : "bg-surface text-on-surface border-surface-active hover:bg-surface-hover",
                opt.disabled && "opacity-50 cursor-not-allowed"
              )}
            >
              <span className="inline-flex items-center gap-2">
                {selected && <CheckIcon className="w-4 h-4" />}
                {opt.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/** ===== Dropdown (custom popover) variant ===== */
function DropdownSelect({
  label,
  options,
  value,
  onChange,
  placeholder,
  className,
}: Omit<SelectControlProps, "variant">) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);
  const activeIndex = Math.max(
    0,
    options.findIndex((o) => o.value === value)
  );

  const selectedLabel = useMemo(() => {
    const found = options.find((o) => o.value === value);
    return found?.label ?? placeholder;
  }, [options, value, placeholder]);

  // Close on outside click
  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!open) return;
      const t = e.target as Node;
      if (listRef.current?.contains(t) || triggerRef.current?.contains(t)) return;
      setOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [open]);

  // Keyboard handling
  function onTriggerKeyDown(e: React.KeyboardEvent<HTMLButtonElement>) {
    if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setOpen(true);
      // focus first/selected item after opening
      requestAnimationFrame(() => {
        const el = listRef.current?.querySelector<HTMLElement>(`[data-index="${activeIndex}"]`);
        el?.focus();
      });
    }
  }

  function onOptionKeyDown(e: React.KeyboardEvent<HTMLButtonElement>, idx: number) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = listRef.current?.querySelector<HTMLElement>(
        `[data-index="${Math.min(options.length - 1, idx + 1)}"]`
      );
      next?.focus();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const prev = listRef.current?.querySelector<HTMLElement>(`[data-index="${Math.max(0, idx - 1)}"]`);
      prev?.focus();
    } else if (e.key === "Escape") {
      e.preventDefault();
      setOpen(false);
      triggerRef.current?.focus();
    }
  }

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {label && <span className="text-on-surface">{label}</span>}

      <div className="relative">
        <button
          ref={triggerRef}
          type="button"
          aria-haspopup="listbox"
          aria-expanded={open}
          onClick={() => setOpen((s) => !s)}
          onKeyDown={onTriggerKeyDown}
          className={cn(
            "w-[260px] justify-between inline-flex items-center px-4 py-2 rounded-sm",
            "bg-surface text-on-surface border border-primary/40",
            "hover:bg-surface-hover focus:outline-none focus:ring-2 focus:ring-primary/40"
          )}
        >
          <span className={cn(!value && "text-on-surface/60")}>{selectedLabel}</span>
          <ChevronDown className="w-4 h-4 opacity-70" />
        </button>

        {open && (
          <div
            ref={listRef}
            role="listbox"
            aria-activedescendant={options[activeIndex]?.value}
            className={cn(
              "absolute left-0 mt-2 w-[260px] max-h-64 overflow-auto z-20",
              "bg-surface text-on-surface rounded-md border border-surface-active shadow-lg p-1"
            )}
          >
            {options.map((opt, idx) => {
              const selected = opt.value === value;
              return (
                <button
                  key={opt.value}
                  role="option"
                  aria-selected={selected}
                  data-index={idx}
                  disabled={opt.disabled}
                  onClick={() => {
                    onChange?.(opt.value);
                    setOpen(false);
                    triggerRef.current?.focus();
                  }}
                  onKeyDown={(e) => onOptionKeyDown(e, idx)}
                  className={cn(
                    "w-full text-left px-3 py-2 rounded-sm inline-flex items-center gap-2",
                    "focus:outline-none focus:bg-surface-active",
                    selected ? "bg-surface-active" : "hover:bg-surface-hover",
                    opt.disabled && "opacity-50 cursor-not-allowed"
                  )}
                >
                  <span className={cn("w-4 h-4", selected ? "opacity-100" : "opacity-0")}>
                    <CheckIcon className="w-4 h-4" />
                  </span>
                  {opt.label}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
