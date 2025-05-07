import { TermsAndConditionsType } from "./types";

export const sampleTerms: TermsAndConditionsType[] = [
  {
    id: 1,
    title: "Required Terms and Conditions",
    content: "These are the sample required terms and conditions.",
    is_required: true,
  },
  {
    id: 2,
    title: "Required Terms and Conditions without content",
    content: "These are the sample required terms and conditions.",
    is_required: true,
  },
  {
    id: 3,
    title: "알림 수신 동의",
    content: "",
    is_required: false,
  },
];
