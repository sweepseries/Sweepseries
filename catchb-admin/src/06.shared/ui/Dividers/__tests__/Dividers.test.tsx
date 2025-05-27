import { describe, it } from "vitest";

import { Divider, VerticalDivider } from "@shared/ui/Dividers";
import { renderWithProviders } from "@test-utils/renderer";

describe("Dividers", () => {
  it("renders Divider with default props", () => {
    renderWithProviders(<Divider />);
  });

  it("renders Divider with custom color and bold", () => {
    renderWithProviders(<Divider color="#FF0000" bold />);
  });
});

describe("VerticalDivider", () => {
  it("renders VerticalDivider with default props", () => {
    renderWithProviders(<VerticalDivider />);
  });

  it("renders VerticalDivider with custom height, color, and bold", () => {
    renderWithProviders(<VerticalDivider height="50%" color="#00FF00" bold />);
  });
});
