import { describe, it, vi } from "vitest";

import { AppIcon } from "@shared/ui/Icons";
import { renderWithProviders } from "@test-utils/renderer";

vi.unmock("@shared/ui/Icons");

vi.mock("../files/announcement.svg?react", () => {
  return {
    default: () => <svg data-testid="announcement-icon" />,
  };
});

describe("<AppIcon />", () => {
  it("should render without crashing", () => {
    renderWithProviders(<AppIcon icon="announcement" />);
  });

  it("should log an error if the icon is not found", () => {
    vi.spyOn(console, "error").mockImplementation(() => {});

    renderWithProviders(<AppIcon icon="non-existent-icon" />);
  });
});
