export type ModalProps = {
  open: boolean;
  title?: string;
  children?: React.ReactNode;
  onClose: () => void;
};
