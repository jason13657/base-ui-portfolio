"use client";

import { cn } from "@/lib/utils";
import React, { createContext, useContext, useMemo, useRef, useState } from "react";
import { CheckIcon } from "../icons/Check";
import { XIcon } from "../icons/XIcon";

export type ToastVariant = "success" | "warning" | "error";

export type ToastItem = {
  id: string;
  title: string;
  message?: string;
  variant: ToastVariant;
  duration?: number; // ms (default 3500)
};

type ToastCtx = {
  notify: (t: Omit<ToastItem, "id">) => string;
  dismiss: (id: string) => void;
};

const ToastContext = createContext<ToastCtx | null>(null);

// Hooks
export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within <ToastProvider>");
  return ctx;
}

const VARIANT = {
  success: {
    ring: "ring-primary/15",
    bar: "bg-primary",
    dot: "bg-primary",
    icon: (cls = "") => <CheckIcon className={cls} />,
  },
  warning: {
    ring: "ring-tertiary/20",
    bar: "bg-tertiary",
    dot: "bg-tertiary",
    icon: (cls = "") => <CheckIcon className={cls} />,
  },
  error: {
    ring: "ring-error/20",
    bar: "bg-error",
    dot: "bg-error",
    icon: (cls = "") => <XIcon className={cls} />,
  },
} as const;

// Ctx wrapper
export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const timers = useRef<Record<string, any>>({});

  const dismiss = (id: string) => {
    setToasts((x) => x.filter((t) => t.id !== id));
    if (timers.current[id]) {
      clearTimeout(timers.current[id]);
      delete timers.current[id];
    }
  };

  const notify = (t: Omit<ToastItem, "id">) => {
    const id = Math.random().toString(36).slice(2, 9);
    const item: ToastItem = { duration: 3500, ...t, id };
    setToasts((curr) => [item, ...curr]);
    // Close after duration
    timers.current[id] = setTimeout(() => dismiss(id), item.duration);
    return id;
  };

  const value = useMemo(() => ({ notify, dismiss }), []);

  return (
    <ToastContext.Provider value={value}>
      {children}

      {/* Portal */}
      <div
        aria-live="polite"
        aria-atomic="true"
        className="pointer-events-none fixed top-4 right-4 z-[60] flex flex-col gap-4"
      >
        {toasts.map((t) => {
          const v = VARIANT[t.variant];
          return (
            <div
              key={t.id}
              className={cn("pointer-events-auto rounded-sm bg-surface text-on-surface shadow-lg ring-1", v.ring)}
            >
              <div className="relative flex items-center gap-2 p-3">
                <div className={cn("absolute left-0 top-0 h-full w-3 rounded-l-sm", v.bar)} />

                <div className="ml-4 flex-1 min-w-[350px]">
                  <div className="font-semibold leading-tight">{t.title}</div>
                  {t.message && <div className="mt-1 text-on-surface/80 text-sm">{t.message}</div>}
                </div>

                <div
                  className={cn(
                    "grid h-8 w-8 place-items-center rounded-sm text-on-primary",
                    v.dot,
                    t.variant === "warning" && "text-on-tertiary"
                  )}
                >
                  {v.icon("w-4 h-4")}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}
