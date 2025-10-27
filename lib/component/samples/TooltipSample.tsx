import { Tooltip } from "@/lib/ui/tooltip";

export default function TooltipSample() {
  return (
    <div>
      <h3 className="text-2xl mb-4">Tooltip</h3>

      <div className="flex gap-5">
        <Tooltip content="Tool tip content Top" position="top" />
        <Tooltip content="Tool tip content Right" position="right" />
      </div>
    </div>
  );
}
