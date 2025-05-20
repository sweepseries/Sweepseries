import { FAQType, FAQResponseType } from "./types";

export const sampleFAQs_general: FAQType[] = [
  {
    id: 1,
    category: "General",
    question: "What is the purpose of this app?",
    answer:
      "This app is designed to help users manage their tasks efficiently.",
  },
  {
    id: 2,
    category: "General",
    question: "How do I reset my password?",
    answer:
      "You can reset your password by going to the settings page and clicking on 'Reset Password'.",
  },
];

const sampleFAQs_technical: FAQType[] = [
  {
    id: 3,
    category: "Technical",
    question: "Why is the app crashing?",
    answer:
      "The app may crash due to a variety of reasons. Please check your internet connection and try again.",
  },
  {
    id: 4,
    category: "Technical",
    question: "How do I report a bug?",
    answer:
      "You can report a bug by going to the settings page and clicking on 'Report a Bug'.",
  },
];

const sampleFAQs_billing: FAQType[] = [
  {
    id: 5,
    category: "Billing",
    question: "How do I update my billing information?",
    answer:
      "You can update your billing information by going to the billing page and clicking on 'Update Billing Information'.",
  },
  {
    id: 6,
    category: "Billing",
    question: "What payment methods are accepted?",
    answer: "We accept all major credit cards and PayPal.",
  },
];

export const sampleFAQResponse: FAQResponseType = {
  categories: ["전체", "일반", "기술", "결제"],
  faqs: {
    전체: [
      ...sampleFAQs_general,
      ...sampleFAQs_technical,
      ...sampleFAQs_billing,
    ],
    일반: sampleFAQs_general,
    기술: sampleFAQs_technical,
    결제: sampleFAQs_billing,
  },
};
