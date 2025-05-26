import { describe, expect, it, vi } from "vitest";
import axios from "axios";

import { sampleTerms, useTerms } from "@entities/terms";
import { renderWithProviders } from "@test-utils/renderer";

const MockListComponent = () => {
  const { data, isSuccess } = useTerms();

  return (
    <div>
      {isSuccess && data ? (
        <>
          {data.map((term) => (
            <div key={term.id}>{term.title}</div>
          ))}
        </>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

describe("ListTerms", () => {
  it("should render terms list", async () => {
    vi.spyOn(axios, "get").mockResolvedValueOnce({
      data: sampleTerms,
    });

    const { findByText } = renderWithProviders(<MockListComponent />);

    expect(await findByText("Terms of Service")).toBeInTheDocument();
    expect(await findByText("Privacy Policy")).toBeInTheDocument();
  });
});
