"use client";

import { useEffect } from "react";
import { XIcon } from "../icons/XIcon";
import { ModalProps } from "./types";

export function Modal({ open, title, children, onClose }: ModalProps) {
  // ESC close
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? "modal-title" : undefined}
      className="fixed inset-0 z-50 flex items-center justify-center"
    >
      {/* overlay */}
      <div className="absolute inset-0 bg-black/40" onClick={onClose} aria-hidden />

      {/* panel */}
      <div className="relative bg-surface text-on-surface rounded-sm shadow-xl w-[min(720px,92vw)] p-8">
        {/* title */}
        {title && (
          <h2 id="modal-title" className="text-4xl text-center mb-6">
            {title}
          </h2>
        )}

        {/* close button */}
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute -right-3 -top-3 grid place-items-center w-10 h-10 rounded-md border border-primary text-primary bg-surface hover:bg-surface-hover active:bg-surface-active"
        >
          <XIcon />
        </button>

        {children}
      </div>
    </div>
  );
}
