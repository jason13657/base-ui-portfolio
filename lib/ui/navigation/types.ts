export type NavItem = {
  id: string;
  label: string;
  href?: string;
  children?: { id: string; label: string; href?: string }[];
  disabled?: boolean;
};

export type NavigationProps = {
  logo?: React.ReactNode;
  items: NavItem[];
  defaultActiveId?: string;
  onSelect?: (id: string) => void;
  className?: string;
};
