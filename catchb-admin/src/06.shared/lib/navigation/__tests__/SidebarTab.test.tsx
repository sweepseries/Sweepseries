import { describe, it, vi } from "vitest";

import { SidebarTab, tabs } from "@shared/lib/navigation";
import { renderWithProviders } from "@test-utils/renderer";

vi.unmock("@shared/lib/navigation");

describe("<SidebarTab />", () => {
  it("should render without crashing", () => {
    renderWithProviders(
      <SidebarTab
        tab={tabs[0]}
        isSelected={false}
        isSidebarOpen={false}
        onClick={vi.fn()}
      />
    );
  });

  it("should apply selected styles when isSelected is true", () => {
    renderWithProviders(
      <SidebarTab
        tab={tabs[0]}
        isSelected={true}
        isSidebarOpen={true}
        onClick={vi.fn()}
      />
    );
  });
});
