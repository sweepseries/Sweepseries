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

  const toggleIsImportant = useCallback(() => {
    setIsImportant((prev) => !prev);
  }, []);

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
      toggleIsImportant,
      resetForm,
    }),
    [title, content, isImportant, toggleIsImportant, resetForm]
  );

  return (
    <AnnouncementForm.Provider value={value}>
      {children}
    </AnnouncementForm.Provider>
  );
}
