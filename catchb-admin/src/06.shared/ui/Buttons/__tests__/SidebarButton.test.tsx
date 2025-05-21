import { describe, it } from "vitest";
import { render } from "@testing-library/react";

import { SidebarButton } from "@shared/ui/Buttons";

describe("<SidebarButton />", () => {
  it("should render without crashing", () => {
    render(<SidebarButton>Test</SidebarButton>);
  });
});
