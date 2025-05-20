import { useMemo, useState } from "react";

import { ColorContext, light, dark } from "@shared/lib/colors";

export function ColorsProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  const colors = useMemo(() => {
    return isDarkMode ? dark : light;
  }, [isDarkMode]);

  const value = useMemo(() => ({ colors, toggleTheme }), [colors]);

  return (
    <ColorContext.Provider value={value}>{children}</ColorContext.Provider>
  );
}
