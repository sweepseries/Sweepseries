export type FAQType = {
  id: number;
  category: string;
  question: string;
  answer: string;
};

export type FAQResponseType = {
  categories: string[];
  faqs: {
    [category: string]: FAQType[];
  };
};
