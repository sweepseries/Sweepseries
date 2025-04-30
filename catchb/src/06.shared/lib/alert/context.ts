import { createContext } from "react";

import { AlertProps } from "./types";

interface AlertContextValue {
  showAlert: (options: AlertProps) => void;
}

export const AlertContext = createContext<AlertContextValue | undefined>(
  undefined
);
