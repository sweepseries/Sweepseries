import { describe, expect, it, vi } from "vitest";
import axios from "axios";

import { sampleFAQDetail, useRetrieveFAQ } from "@entities/faqs";
import { renderWithProviders } from "@test-utils/renderer";

const MockDetailComponent = () => {
  const { data, isSuccess } = useRetrieveFAQ(1);

  return (
    <div>
      {isSuccess && data ? <h1>{data.question}</h1> : <div>Loading...</div>}
    </div>
  );
};

describe("RetrieveFAQ", () => {
  it("should render FAQ details", async () => {
    vi.spyOn(axios, "get").mockResolvedValueOnce({
      data: sampleFAQDetail,
    });

    const { findByText } = renderWithProviders(<MockDetailComponent />);

    expect(await findByText("What is CatchB?")).toBeInTheDocument();
  });
});
