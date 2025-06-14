import { TruncatedText } from "@shared/ui/Text";
import { renderWithProviders } from "@test-utils/renderer";

describe("TruncatedText", () => {
  it("renders text with default number of lines", () => {
    const { getByText } = renderWithProviders(
      <TruncatedText text="This is a long text that should be truncated." />
    );
    expect(
      getByText("This is a long text that should be truncated.")
    ).toBeTruthy();
  });

  it("truncates text to specified number of lines", () => {
    const { getByText } = renderWithProviders(
      <TruncatedText text={"Line 1\nLine 2\nLine 3\nLine 4"} numberOfLines={2} />
    );
    expect(getByText("Line 1\nLine 2 \u22EF")).toBeTruthy();
  });

  it("does not truncate if text has fewer lines than specified", () => {
    const { getByText } = renderWithProviders(
      <TruncatedText text="Short text" numberOfLines={2} />
    );
    expect(getByText("Short text")).toBeTruthy();
  });
});
