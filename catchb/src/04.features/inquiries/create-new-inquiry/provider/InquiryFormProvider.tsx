import { useContext, useMemo, useState } from "react";

import { InquiryFormContext, InquiryFormContextType } from "./context";

export function InquiryFormProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const openForm = () => {
    setIsOpen(true);
  };

  const closeForm = () => {
    setIsOpen(false);
  };

  const value = useMemo<InquiryFormContextType>(
    () => ({
      isOpen,
      openForm,
      closeForm,
    }),
    [isOpen]
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
