export type InputStatus = "default" | "error" | "success";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  message?: string;
  status?: InputStatus;
  rightElement?: React.ReactNode; // e.g. password toggle, icon
}
