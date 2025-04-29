import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

import { AlertProps, CatchBAlert } from "@shared/ui/Alert";

interface AlertContextValue {
  showAlert: (options: AlertProps) => void;
}

const AlertContext = createContext<AlertContextValue | undefined>(undefined);

interface AlertProviderProps {
  children: ReactNode;
}

export function AlertProvider({ children }: Readonly<AlertProviderProps>) {
  const [options, setOptions] = useState<AlertProps | null>(null);

  const showAlert = useCallback((opts: AlertProps) => {
    setOptions(opts);
  }, []);

  const hideAlert = useCallback(() => {
    setOptions(null);
  }, []);

  const contextValue = useMemo(() => ({ showAlert }), [showAlert]);

  return (
    <AlertContext.Provider value={contextValue}>
      {children}
      {options && (
        <CatchBAlert
          {...options}
          onConfirm={() => {
            options.onConfirm?.();
            hideAlert();
          }}
        />
      )}
    </AlertContext.Provider>
  );
}

export function useAlert() {
  const ctx = useContext(AlertContext);
  if (!ctx) {
    throw new Error("useAlert must be used within an AlertProvider");
  }
  return ctx;
}
