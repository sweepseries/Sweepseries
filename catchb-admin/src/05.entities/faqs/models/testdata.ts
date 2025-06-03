import type {
  FAQCategoryType,
  AdminCatchBFAQSimpleType,
  AdminCatchBFAQDetailType,
  FAQListResponseType,
} from "./types";

export const sampleFAQCategories: FAQCategoryType[] = [
  {
    id: 1,
    name: "General",
    color: "#FF5733",
  },
  {
    id: 2,
    name: "Technical",
    color: "#33FF57",
  },
  {
    id: 3,
    name: "Billing",
    color: "#3357FF",
  },
];

export const sampleFAQs: AdminCatchBFAQSimpleType[] = [
  {
    id: 1,
    question: "What is CatchB?",
    category: sampleFAQCategories[0],
    is_active: true,
  },
  {
    id: 2,
    question: "How to reset my password?",
    category: sampleFAQCategories[1],
    is_active: true,
  },
  {
    id: 3,
    question: "What payment methods are accepted?",
    category: sampleFAQCategories[2],
    is_active: false,
  },
];

export const sampleFAQDetail: AdminCatchBFAQDetailType = {
  id: 1,
  question: "What is CatchB?",
  answer: "CatchB is a platform that helps you manage your tasks efficiently.",
  category: sampleFAQCategories[0],
  is_active: true,
};

export const sampleFAQListResponse: FAQListResponseType = {
  categories: sampleFAQCategories,
  faqs: {
    General: [sampleFAQs[0]],
    Technical: [sampleFAQs[1]],
    Billing: [sampleFAQs[2]],
  },
};
