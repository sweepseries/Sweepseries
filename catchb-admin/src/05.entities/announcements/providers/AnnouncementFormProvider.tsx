import { useCallback, useMemo, useState } from "react";

import {
  AnnouncementForm,
  type AnnouncementFormType,
} from "../models/contexts";

export function AnnouncementFormProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Define state and functions for the form
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [isImportant, setIsImportant] = useState<boolean>(false);

  const resetForm = useCallback(() => {
    setTitle("");
    setContent("");
    setIsImportant(false);
  }, []);

  const value = useMemo<AnnouncementFormType>(
    () => ({
      title,
      content,
      isImportant,
      setTitle,
      setContent,
      setIsImportant,
      resetForm,
    }),
    [title, content, isImportant, resetForm]
  );

  return (
    <AnnouncementForm.Provider value={value}>
      {children}
    </AnnouncementForm.Provider>
  );
}
