import { useContext, useEffect, useMemo, useState } from "react";
import { useColorScheme } from "react-native";

import { lightColors, darkColors } from "../models/colors";
import { ColorContext } from "../models/context";

export function ColorsProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const deviceColorScheme = useColorScheme();
  const [colorScheme, setColorScheme] = useState<"light" | "dark">(
    deviceColorScheme === "dark" ? "dark" : "light"
  );

  useEffect(() => {
    setColorScheme(deviceColorScheme === "dark" ? "dark" : "light");
  }, [deviceColorScheme]);

  const value = useMemo(
    () => ({
      colors: colorScheme === "dark" ? darkColors : lightColors,
    }),
    [colorScheme]
  );

  return (
    <ColorContext.Provider value={value}>{children}</ColorContext.Provider>
  );
}

export const useColors = () => {
  const context = useContext(ColorContext);

  if (!context) {
    throw new Error("useColors must be used within a ColorsProvider");
  }

  return context;
};
