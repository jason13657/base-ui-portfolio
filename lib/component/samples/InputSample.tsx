"use client";

import { EyeIcon } from "@/lib/ui/icons/EyeIcon";
import { Input } from "@/lib/ui/input";
import { useState } from "react";

export default function InputSample() {
  return (
    <div>
      <h3 className="text-2xl mb-4">Input</h3>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* ===== Left: Text ===== */}
        <div>
          <h4>Text</h4>

          {/* Default */}
          <div>
            <label className="block mb-3 text-primary">Label</label>
            <Input placeholder="Placeholder..." status="default" className="border border-primary/60 rounded-lg" />
            <div className="mt-3 text-right text-primary">Additional Message</div>
          </div>

          {/* Error */}
          <div>
            <label className="block mb-3 text-primary">Label</label>
            <Input placeholder="Placeholder..." status="error" className="border border-error rounded-lg" />
            <div className="mt-3 text-center lg:text-right text-error">Error message</div>
          </div>
        </div>

        {/* ===== Right: Password ===== */}
        <div>
          <h4>Password</h4>

          {/* Default */}
          <div>
            <label className="block mb-3 text-primary">Password</label>
            <PasswordField label="" status="default" placeholder="••••••••" />
            <div className="mt-3 text-right text-primary">Forgot Password?</div>
          </div>

          {/* Error */}
          <div>
            <label className="block mb-3 text-primary">Password</label>
            <PasswordField label="" status="error" placeholder="••••••••" message={undefined} />
            <div className="mt-3 text-center lg:text-right text-error">Incorrect Password</div>
          </div>
        </div>
      </div>
    </div>
  );
}
function PasswordField({
  label,
  placeholder = "••••••••",
  message,
  status = "default" as "default" | "error" | "success",
}: {
  label: string;
  placeholder?: string;
  message?: string;
  status?: "default" | "error" | "success";
}) {
  const [show, setShow] = useState(false);
  return (
    <Input
      type={show ? "text" : "password"}
      label={label}
      placeholder={placeholder}
      status={status}
      rightElement={
        <button
          type="button"
          onClick={() => setShow((s) => !s)}
          className="rounded-sm text-on-surface hover:bg-surface-hover focus:bg-surface-active focus:outline-none"
          aria-label={show ? "Hide password" : "Show password"}
        >
          <EyeIcon className="w-6 h-6" />
        </button>
      }
      className="border rounded-lg"
      message={message}
    />
  );
}
