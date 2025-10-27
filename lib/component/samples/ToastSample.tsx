"use client";

import { Button } from "@/lib/ui/button";
import { ToastProvider, useToast } from "@/lib/ui/Toast";
import * as React from "react";

function DemoButtons() {
  const { notify } = useToast();

  return (
    <div className="space-x-3">
      <Button
        onClick={() =>
          notify({
            variant: "success",
            title: "Success",
            message: "Success Message",
          })
        }
      >
        Show Success
      </Button>

      <Button
        onClick={() =>
          notify({
            variant: "warning",
            title: "Warning",
            message: "Warning Message",
          })
        }
        variant="tertiary"
      >
        Show Success
      </Button>

      <Button
        onClick={() =>
          notify({
            variant: "error",
            title: "Error",
            message: "Error Message",
          })
        }
        variant="error"
      >
        Show Error
      </Button>
    </div>
  );
}

export default function ToastSample() {
  return (
    <ToastProvider>
      <div>
        <h3 className="text-2xl mb-4">Toast</h3>
        <DemoButtons />
      </div>
    </ToastProvider>
  );
}
