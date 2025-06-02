import { describe, expect, it } from "vitest";

import { AddButton, SubTab, SubTabContainer } from "@shared/ui/Tabs";
import { renderWithProviders } from "@test-utils/renderer";

describe("SubTab", () => {
  it("renders SubTabContainer and SubTab components", () => {
    const { getByText } = renderWithProviders(
      <SubTabContainer>
        <SubTab $isActive={true}>Active Tab</SubTab>
        <SubTab $isActive={false}>Inactive Tab</SubTab>
        <AddButton>Add New</AddButton>
      </SubTabContainer>
    );

    expect(getByText("Active Tab")).toBeInTheDocument();
    expect(getByText("Inactive Tab")).toBeInTheDocument();
    expect(getByText("Add New")).toBeInTheDocument();
  });
});
