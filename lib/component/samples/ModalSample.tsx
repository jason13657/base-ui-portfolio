"use client";

import { Button } from "@/lib/ui/button";
import { Modal } from "@/lib/ui/modal";
import React from "react";

export default function ModalSample() {
  const [open, setOpen] = React.useState(false);

  return (
    <div>
      <h3 className="text-2xl mb-2">Modal/Dialog</h3>

      <Button onClick={() => setOpen(true)}>Open Modal</Button>

      <Modal open={open} onClose={() => setOpen(false)} title="Title Text">
        <div className="bg-surface-active text-on-surface rounded-xl h-48 grid place-items-center text-3xl">
          Modal Content
        </div>
      </Modal>
    </div>
  );
}
