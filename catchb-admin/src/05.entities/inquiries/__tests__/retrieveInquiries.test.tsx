import { describe, expect, it, vi } from "vitest";
import axios from "axios";

import {
  sampleInquiryThreadDetail,
  useInquiryDetails,
} from "@entities/inquiries";
import { renderWithProviders } from "@test-utils/renderer";

const MockDetailComponent = () => {
  const { data, isSuccess } = useInquiryDetails(1);

  return (
    <div>
      {isSuccess && data ? <h1>{data.title}</h1> : <div>Loading...</div>}
    </div>
  );
};

describe("RetrieveInquiries", () => {
  it("should render inquiry details", async () => {
    vi.spyOn(axios, "get").mockResolvedValueOnce({
      data: sampleInquiryThreadDetail,
    });

    const { findByText } = renderWithProviders(<MockDetailComponent />);

    expect(await findByText("How to reset my password?")).toBeInTheDocument();
  });
});
