export type FAQCategoryType = {
  id: number;
  name: string;
  color: string;
};

export type AdminCatchBFAQSimpleType = {
  id: number;
  question: string;
  category: FAQCategoryType;
  is_active: boolean;
};

export type FAQListResponseType = {
  categories: FAQCategoryType[];
  faqs: {
    [category: string]: AdminCatchBFAQSimpleType[];
  };
};

export type AdminCatchBFAQDetailType = {
  answer: string;
} & AdminCatchBFAQSimpleType;
