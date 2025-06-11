import {
  InquiryForm,
  InquiryFormProvider,
  InquiryGuide,
  useInquiryForm,
} from "@features/inquiries/create-new-inquiry";
import { InquiriesList } from "@features/inquiries/list-inquiries";
import { ScrollViewOnOverflow } from "@shared/ui/ScrollView";

export function InquiriesPage() {
  return (
    <InquiryFormProvider>
      <InquiryPageComponent />
    </InquiryFormProvider>
  );
}

function InquiryPageComponent() {
  const { isOpen, scrollRef } = useInquiryForm();

  return (
    <ScrollViewOnOverflow ref={scrollRef}>
      <InquiryGuide />
      {isOpen ? <InquiryForm /> : <InquiriesList />}
    </ScrollViewOnOverflow>
  );
}
