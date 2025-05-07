export interface AlertProps {
  title?: string;
  message: string;
  onConfirm?: () => void;
  confirmText?: string;
}
