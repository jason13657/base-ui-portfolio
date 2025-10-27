"use client";

import { Tabs } from "@/lib/ui/tabs";
import { TabItem } from "@/lib/ui/tabs/types";
import * as React from "react";

const items: TabItem[] = [
  { id: "t1", label: "Tab 1", content: <div className="h-8" /> },
  { id: "t2", label: "Tab 2", content: <div className="h-8" /> },
  { id: "t3", label: "Tab 3", content: <div className="h-8" /> },
  { id: "t4", label: "Tab 4", content: <div className="h-8" /> },
];

export default function TabsSample() {
  return (
    <div>
      <h3 className="text-2xl mb-4">Tabs</h3>

      <section className="space-y-3">
        <h4>Type 1</h4>
        <Tabs variant="underline" items={items} defaultTab="t1" className="max-w-5xl" />
      </section>

      <section className="space-y-3">
        <h4>Type 2</h4>
        <Tabs variant="pills" items={items} defaultTab="t1" className="max-w-5xl" />
      </section>
    </div>
  );
}
