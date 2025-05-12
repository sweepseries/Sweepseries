type VoidOrPromise = void | Promise<void>;

export type AlertContextType = {
  title?: string;
  message: string;
  onConfirm?: () => VoidOrPromise;
  confirmText?: string;
  enableCancel?: boolean;
};

export type AlertProps = {
  title?: string;
  message: string;
  onConfirm?: () => VoidOrPromise;
  confirmText?: string;
  onCancel?: () => void;
};
