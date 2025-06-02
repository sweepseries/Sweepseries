import { useMemo, useState } from "react";

import {
  CreateTermContext,
  type CreateTermContextType,
} from "../models/context";

export function CreateTermProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [title, setTitle] = useState<string>("");
  const [isRequired, setIsRequired] = useState<boolean>(false);

  const value = useMemo<CreateTermContextType>(
    () => ({
      title,
      setTitle,
      isRequired,
      setIsRequired,
    }),
    [title, isRequired]
  );

  return (
    <CreateTermContext.Provider value={value}>
      {children}
    </CreateTermContext.Provider>
  );
}
