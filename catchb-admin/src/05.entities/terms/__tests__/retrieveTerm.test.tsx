import { describe, expect, it, vi } from "vitest";
import axios from "axios";

import { sampleTermDetails, useRetrieveTerm } from "@entities/terms";
import { renderWithProviders } from "@test-utils/renderer";

const MockDetailComponent = () => {
  const { data, isSuccess } = useRetrieveTerm(1);

  return (
    <div>
      {isSuccess && data ? <h1>{data.title}</h1> : <div>Loading...</div>}
    </div>
  );
};

describe("RetrieveTerm", () => {
  it("should render term details", async () => {
    vi.spyOn(axios, "get").mockResolvedValueOnce({
      data: sampleTermDetails,
    });

    const { findByText } = renderWithProviders(<MockDetailComponent />);

    expect(await findByText("Terms of Service")).toBeInTheDocument();
  });
});
