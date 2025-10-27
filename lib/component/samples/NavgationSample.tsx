"use client";

import { Navigation } from "@/lib/ui/navigation";
import { NavItem } from "@/lib/ui/navigation/types";
import { useState } from "react";

const navItems: NavItem[] = [
  {
    id: "item1",
    label: "Item 1",
    children: [
      { id: "c11", label: "Sub A" },
      { id: "c12", label: "Sub B" },
    ],
  },
  { id: "item2", label: "Item 2", children: [{ id: "c21", label: "Sub C" }] },
  { id: "item3", label: "Item 3", children: [{ id: "c31", label: "Sub D" }] },
  { id: "item4", label: "Item 4", children: [{ id: "c41", label: "Sub E" }] },
];

export default function NavSample() {
  const [active, setActive] = useState("item1");

  return (
    <div>
      <h3 className="text-2xl mb-2">Navigation</h3>
      <Navigation
        items={navItems}
        defaultActiveId="item1"
        onSelect={setActive}
        className="border border-surface-active"
      />
    </div>
  );
}
