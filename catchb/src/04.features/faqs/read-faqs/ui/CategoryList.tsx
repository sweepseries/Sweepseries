import { useFAQList } from "../provider/FAQListProvider";
import { FAQSimple } from "@entities/faqs";

export function CategoryList() {
  const { faqs, selectedFAQId, setSelectedFAQId } = useFAQList();

  const isFAQExpanded = (id: number) => {
    return selectedFAQId === id;
  };

  const pressFAQ = (id: number) => {
    if (selectedFAQId === id) {
      setSelectedFAQId(-1);
    } else {
      setSelectedFAQId(id);
    }
  };

  return (
    <>
      {faqs.map((faq) => (
        <FAQSimple
          key={faq.id}
          faq={faq}
          expanded={isFAQExpanded(faq.id)}
          onPress={() => pressFAQ(faq.id)}
        />
      ))}
    </>
  );
}
