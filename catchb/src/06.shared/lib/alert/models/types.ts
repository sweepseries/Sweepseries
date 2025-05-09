export type AlertContextType = {
  title?: string;
  message: string;
  onConfirm?: () => void;
  confirmText?: string;
  enableCancel?: boolean;
};

export type AlertProps = {
  title?: string;
  message: string;
  onConfirm?: () => void;
  confirmText?: string;
  onCancel?: () => void;
};
