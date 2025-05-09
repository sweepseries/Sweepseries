import { createContext } from "react";

import { AlertContextType } from "./types";

interface AlertContextValue {
  showAlert: (options: AlertContextType) => void;
}

export const AlertContext = createContext<AlertContextValue | undefined>(
  undefined
);
