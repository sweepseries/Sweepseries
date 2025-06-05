import { describe, expect, it, vi } from "vitest";
import axios from "axios";

import {
  sampleInquiryThreadListResponse,
  useInquiries,
} from "@entities/inquiries";
import { renderWithProviders } from "@test-utils/renderer";

const MockListComponent = () => {
  const { data, isSuccess } = useInquiries();

  return (
    <div>{isSuccess && data ? <div>Loaded!</div> : <div>Loading...</div>}</div>
  );
};

describe("ListInquiries", () => {
  it("should render inquiries list", async () => {
    vi.spyOn(axios, "get").mockResolvedValueOnce({
      data: sampleInquiryThreadListResponse,
    });

    const { findByText } = renderWithProviders(<MockListComponent />);

    expect(await findByText("Loaded!")).toBeInTheDocument();
  });
});
