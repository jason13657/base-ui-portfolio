"use client";

import { SelectControl } from "@/lib/ui/select";
import { SelectControlOptions } from "@/lib/ui/select/types";
import { useState } from "react";

const opts: SelectControlOptions[] = [
  { label: "School", value: "school" },
  { label: "Teacher", value: "teacher" },
  { label: "Student", value: "student" },
];

export default function SelectSample() {
  const [v1, setV1] = useState("student");
  const [v2, setV2] = useState("student");

  return (
    <div>
      <h3 className="text-2xl mb-2">Select</h3>
      <div className="flex gap-10">
        <SelectControl variant="dropdown" label="Dropdown" options={opts} value={v1} onChange={setV1} />
        <SelectControl variant="chips" label="Chips" options={opts} value={v2} onChange={setV2} />
      </div>
    </div>
  );
}
