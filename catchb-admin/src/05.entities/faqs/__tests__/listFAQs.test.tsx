import { describe, expect, it, vi } from "vitest";
import axios from "axios";

import { sampleFAQListResponse, useFAQs } from "@entities/faqs";
import { renderWithProviders } from "@test-utils/renderer";

const MockListComponent = () => {
  const { data, isSuccess } = useFAQs();

  return (
    <div>
      {isSuccess && data ? (
        <>
          {data.categories.map((category) => (
            <div key={category.id}>
              <h2>{category.name}</h2>
              {data.faqs[category.name].map((faq) => (
                <div key={faq.id}>{faq.question}</div>
              ))}
            </div>
          ))}
        </>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

describe("ListFAQs", () => {
  it("should render FAQs list", async () => {
    vi.spyOn(axios, "get").mockResolvedValueOnce({
      data: sampleFAQListResponse,
    });

    const { findByText } = renderWithProviders(<MockListComponent />);

    expect(await findByText("General")).toBeInTheDocument();
    expect(await findByText("What is CatchB?")).toBeInTheDocument();
    expect(await findByText("Technical")).toBeInTheDocument();
    expect(await findByText("How to reset my password?")).toBeInTheDocument();
    expect(await findByText("Billing")).toBeInTheDocument();
    expect(
      await findByText("What payment methods are accepted?")
    ).toBeInTheDocument();
  });
});
