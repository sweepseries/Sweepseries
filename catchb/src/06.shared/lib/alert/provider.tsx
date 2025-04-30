import { useCallback, useMemo, useState } from "react";

import { AlertContext } from "./context";
import { AlertProps } from "./types";
import { CatchBAlert } from "./ui";

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
