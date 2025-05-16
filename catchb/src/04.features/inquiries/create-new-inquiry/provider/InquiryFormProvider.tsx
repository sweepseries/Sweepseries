import { useContext, useEffect, useMemo, useState } from "react";

import { InquiryFormContext, InquiryFormContextType } from "./context";
import { inquiryCategories, InquiryCategoryType } from "@entities/inquiries";

export function InquiryFormProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [category, setCategory] = useState<InquiryCategoryType | null>(null);
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");

  const [isOpen, setIsOpen] = useState(false);

  const openForm = () => {
    setIsOpen(true);
  };

  const closeForm = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    setCategory(inquiryCategories[0]);
  }, []);

  const value = useMemo<InquiryFormContextType>(
    () => ({
      name,
      setName,
      email,
      setEmail,
      phone,
      setPhone,
      category,
      setCategory,
      title,
      setTitle,
      content,
      setContent,
      isOpen,
      openForm,
      closeForm,
    }),
    [name, email, phone, category, title, content, isOpen]
  );

  return (
    <InquiryFormContext.Provider value={value}>
      {children}
    </InquiryFormContext.Provider>
  );
}

export function useInquiryForm() {
  const context = useContext(InquiryFormContext);
  if (!context) {
    throw new Error("useInquiryForm must be used within a InquiryFormProvider");
  }
  return context;
}
