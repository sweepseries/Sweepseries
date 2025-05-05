import { useCallback, useContext, useMemo, useState } from "react";

import { AlertContext } from "../models/context";
import { AlertProps } from "../models/types";
import { CatchBAlert } from "../ui/CatchBAlert";

interface AlertProviderProps {
  children: React.ReactNode;
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
