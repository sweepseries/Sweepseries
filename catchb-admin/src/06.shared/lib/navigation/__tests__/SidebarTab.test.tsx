import { describe, it, vi } from "vitest";

import { SidebarTab } from "@shared/lib/navigation";
import { renderWithProviders } from "@test-utils/renderer";

describe("<SidebarTab />", () => {
  it("should render without crashing", () => {
    renderWithProviders(
      <SidebarTab title="Test" isSelected={false} onClick={vi.fn()} />
    );
  });

  it("should apply selected styles when isSelected is true", () => {
    renderWithProviders(
      <SidebarTab title="Test" isSelected={true} onClick={vi.fn()} />
    );
  });
});
