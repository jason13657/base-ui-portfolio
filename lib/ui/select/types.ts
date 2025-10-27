export interface SelectControlOptions {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface SelectControlProps {
  variant: Variant;
  label?: string;
  options: SelectControlOptions[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export type Variant = "dropdown" | "chips";
