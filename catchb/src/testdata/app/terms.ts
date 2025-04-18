import { TermsAndConditionsType } from "@models/app";

export const sampleTermsAndConditions: TermsAndConditionsType[] = [
  {
    id: 1,
    title: "개인정보 처리 방침",
    content: "개인정보 처리 방침의 내용",
    is_required: true,
  },
  {
    id: 2,
    title: "서비스 이용약관",
    content: "서비스 이용약관의 내용",
    is_required: true,
  },
  {
    id: 3,
    title: "알림 수신 동의",
    content: "알림 수신 동의의 내용",
    is_required: false,
  },
];
