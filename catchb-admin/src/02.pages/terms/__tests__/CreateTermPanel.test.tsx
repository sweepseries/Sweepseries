import { describe, expect, it } from "vitest";

import { CreateTermPanel } from "../ui/CreateTerm/CreateTermPanel";
import { renderWithProviders } from "@test-utils/renderer";

describe("CreateTermPanel", () => {
  it("renders correctly", () => {
    const { getByText } = renderWithProviders(<CreateTermPanel />);

    expect(getByText("Create Term")).toBeInTheDocument();
    expect(getByText("Form to create a new term.")).toBeInTheDocument();
  });
});
