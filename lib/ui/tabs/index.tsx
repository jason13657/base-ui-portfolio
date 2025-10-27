import React, { useEffect, useRef, useState } from "react";
import { TabsProps } from "./types";
import { cn } from "@/lib/utils";

export function Tabs({ items, defaultTab, variant = "underline", onChange, className }: TabsProps) {
  const [active, setActive] = useState<string>(defaultTab ?? items[0]?.id);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!active) return;
    onChange?.(active);
  }, [active, onChange]);

  const onKey = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (!["ArrowRight", "ArrowLeft", "Home", "End"].includes(e.key)) return;
    e.preventDefault();

    const els = Array.from(listRef.current?.querySelectorAll<HTMLButtonElement>('[role="tab"]') ?? []).filter(
      (el) => !el.disabled
    );
    if (els.length === 0) return;

    const idx = els.findIndex((el) => el.dataset.id === active);
    const nextIdx =
      e.key === "ArrowRight"
        ? (idx + 1) % els.length
        : e.key === "ArrowLeft"
        ? (idx - 1 + els.length) % els.length
        : e.key === "Home"
        ? 0
        : els.length - 1;

    const nextId = els[nextIdx]?.dataset.id;
    if (nextId) {
      setActive(nextId);
      els[nextIdx]?.focus();
    }
  };

  return (
    <div className={className}>
      {/* Tab list */}
      <div
        ref={listRef}
        role="tablist"
        aria-orientation="horizontal"
        onKeyDown={onKey}
        className={cn(
          variant === "underline"
            ? "border-b border-surface-active"
            : "bg-primary text-on-primary rounded-t-md px-3 pt-3 pb-2"
        )}
      >
        <div className={cn("flex gap-6", variant === "pills" && "gap-3 flex-wrap")}>
          {items.map((it) => {
            const selected = it.id === active;
            const common = "transition-colors focus:outline-none focus:ring-2 focus:ring-primary/40";
            const underline = cn(
              "px-2 py-3 text-xl text-primary",
              selected ? "border-b-2 border-primary" : "text-primary/70 hover:text-primary"
            );
            const pills = cn(
              "px-6 py-2 rounded-lg border text-2xl",
              selected
                ? "bg-surface text-primary border-transparent"
                : "bg-secondary text-on-secondary border-transparent hover:brightness-95",
              it.disabled && "opacity-50 cursor-not-allowed"
            );
            return (
              <button
                key={it.id}
                role="tab"
                aria-selected={selected}
                aria-controls={`panel-${it.id}`}
                id={`tab-${it.id}`}
                data-id={it.id}
                disabled={it.disabled}
                onClick={() => !it.disabled && setActive(it.id)}
                className={cn(common, variant === "underline" ? underline : pills)}
              >
                {it.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Panels */}
      {items.map((it) => {
        const selected = it.id === active;
        return (
          <div
            key={it.id}
            role="tabpanel"
            id={`panel-${it.id}`}
            aria-labelledby={`tab-${it.id}`}
            hidden={!selected}
            className={cn("p-4", variant === "pills" && "bg-surface rounded-b-md")}
          >
            {selected && it.content}
          </div>
        );
      })}
    </div>
  );
}
