import { describe, expect, it } from "vitest";

import { InquiryMessage, sampleInquiryThreadDetail } from "@entities/inquiries";
import { renderWithProviders } from "@test-utils/renderer";

describe("InquiryMessage", () => {
  it("should render user message", () => {
    const { getByText } = renderWithProviders(
      <InquiryMessage message={sampleInquiryThreadDetail.messages[0]} />
    );

    expect(
      getByText("I forgot my password, how can I reset it?")
    ).toBeInTheDocument();
  });

  it("should render admin message", () => {
    const { getByText } = renderWithProviders(
      <InquiryMessage message={sampleInquiryThreadDetail.messages[1]} />
    );

    expect(
      getByText(
        "You can reset your password by clicking on 'Forgot Password' at the login page."
      )
    ).toBeInTheDocument();
  });

  it("should render system message", () => {
    const { getByText } = renderWithProviders(
      <InquiryMessage message={sampleInquiryThreadDetail.messages[2]} />
    );

    expect(
      getByText("상태를 '종료됨'(으)로 변경했습니다. (Admin User)")
    ).toBeInTheDocument();
  });
});
