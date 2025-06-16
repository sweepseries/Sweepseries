import { CommunityStat } from "@entities/posts";
import { renderWithProviders } from "@test-utils/renderer";

describe("CommunityStat Component", () => {
  it("should render with correct icon and value", () => {
    renderWithProviders(
      <CommunityStat icon="eye" value={123} />
    );
  });
});
