import { Button } from "@/lib/ui/button";

export default function ButtonSample() {
  return (
    <div>
      <h3 className="text-2xl mb-2">Button</h3>
      <div className="flex flex-col gap-4">
        {/* Default */}
        <Row title="Default State" />

        {/* Hover */}
        <Row
          title="Hover State"
          overrideClassesByVariant={{
            primary: "bg-primary-hover hover:bg-primary-hover active:bg-primary-hover",
            secondary: "bg-secondary-hover hover:bg-secondary-hover active:bg-secondary-hover",
            surface: "bg-surface-hover hover:bg-surface-hover active:bg-surface-hover text-on-surface",
            tertiary: "bg-tertiary-hover hover:bg-tertiary-hover active:bg-tertiary-hover text-on-tertiary",
          }}
        />

        {/* Active*/}
        <Row
          title="Active State"
          overrideClassesByVariant={{
            primary: "bg-primary-active hover:bg-primary-active active:bg-primary-active",
            secondary: "bg-secondary-active hover:bg-secondary-active active:bg-secondary-active",
            surface: "bg-surface-active hover:bg-surface-active active:bg-surface-active text-on-surface",
            tertiary: "bg-tertiary-active hover:bg-tertiary-active active:bg-tertiary-active text-on-tertiary",
          }}
        />
      </div>

      {/* Labels */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <p className="font-medium">Primary</p>
        <p className="font-medium">Secondary</p>
        <p className="font-medium">Surface</p>
        <p className="font-medium">Tertiary</p>
      </div>
    </div>
  );
}

function Row({
  title,
  overrideClassesByVariant,
}: {
  title: string;
  overrideClassesByVariant?: Partial<Record<"primary" | "secondary" | "surface" | "tertiary", string>>;
}) {
  return (
    <div>
      <h4 className="text-xl">{title}</h4>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Button variant="primary" className={overrideClassesByVariant?.primary}>
          Button
        </Button>

        <Button variant="secondary" className={overrideClassesByVariant?.secondary}>
          Button
        </Button>

        <Button variant="surface" className={overrideClassesByVariant?.surface}>
          Button
        </Button>

        <Button variant="tertiary" className={overrideClassesByVariant?.tertiary}>
          Button
        </Button>
      </div>
    </div>
  );
}
