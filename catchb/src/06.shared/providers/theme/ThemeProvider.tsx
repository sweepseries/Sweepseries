import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useColorScheme } from "react-native";

import { lightColors, darkColors, ThemeColorType } from "@shared/colors";

interface ThemeContextType {
  colors: ThemeColorType;
}

const ThemeContext = createContext<ThemeContextType>({
  colors: lightColors,
});

export function ColorsProvider({ children }: { children: React.ReactNode }) {
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
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useColors() {
  return useContext(ThemeContext);
}
