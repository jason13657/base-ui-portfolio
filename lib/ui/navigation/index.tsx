"use client";

import { cn } from "@/lib/utils";
import { NavigationProps } from "./types";
import { useState } from "react";
import { ChevronDown } from "../icons/ChevronDown";

export function Navigation({
  logo = <span className="text-2xl font-semibold">Logo</span>,
  items,
  defaultActiveId,
  onSelect,
  className,
}: NavigationProps) {
  const first = items[0]?.id;
  const [active, setActive] = useState(defaultActiveId ?? first);
  const [open, setOpen] = useState<string | null>(null);

  const handleSelect = (id: string, hasChildren: boolean) => {
    setActive(id);
    onSelect?.(id);

    setOpen((prev) => (hasChildren ? (prev === id ? null : id) : null));
  };

  return (
    <nav className={className}>
      {/* Top row */}
      <div className="flex items-center justify-between px-8 py-6 pb-3">
        <div className="pb-4">{logo}</div>

        <div className="flex-1 ml-10">
          <div className="border-b border-surface-active">
            <div className="flex gap-16">
              {items.map((it) => {
                const isActive = it.id === active;
                const hasChildren = !!it.children?.length;
                const isOpen = open === it.id;

                return (
                  <button
                    key={it.id}
                    type="button"
                    disabled={it.disabled}
                    onClick={() => handleSelect(it.id, hasChildren)}
                    className={cn(
                      "relative -mb-[1px] pb-3 pt-2",
                      "focus:outline-none",
                      isActive ? "text-primary border-b-2 border-primary" : "text-on-surface hover:text-primary"
                    )}
                  >
                    <span className="inline-flex items-center gap-2">
                      {it.label}
                      {hasChildren && (
                        <ChevronDown
                          className={cn("w-5 h-5 transition-transform", isOpen ? "rotate-180" : "rotate-0")}
                        />
                      )}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Dropdown panel */}
      {items.map((it) => {
        const isOpen = open === it.id && it.children?.length;
        if (!isOpen) return null;
        return (
          <div key={`panel-${it.id}`} className="px-8 pt-4 pb-5 border-b border-surface-active">
            <div className="flex gap-6">
              {it.children!.map((c) => (
                <a key={c.id} href={c.href ?? "#"} className="text-xl text-on-surface hover:text-primary">
                  {c.label}
                </a>
              ))}
            </div>
          </div>
        );
      })}
    </nav>
  );
}
