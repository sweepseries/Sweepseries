import { describe, it, vi } from "vitest";
import { render } from "@testing-library/react";

import { Logo } from "@shared/ui/Icons";

vi.unmock("@shared/ui/Icons");

vi.mock("./files/sweepseries.svg?react", () => ({
  ReactComponent: (props: { width: number; height: number }) => {
    return <div data-testid="mocked-logo" {...props} />;
  },
}));

describe("<Logo />", () => {
  it("should render without crashing", () => {
    render(<Logo />);
  });
});
