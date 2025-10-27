export type TabItem = {
  id: string;
  label: string;
  content: React.ReactNode;
  disabled?: boolean;
};

export type TabsProps = {
  items: TabItem[];
  defaultTab?: string;
  variant?: "underline" | "pills";
  onChange?: (id: string) => void;
  className?: string;
};
