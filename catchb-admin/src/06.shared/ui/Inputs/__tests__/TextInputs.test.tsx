import { describe, it, vi } from "vitest";
import { fireEvent } from "@testing-library/react";

import { TextArea, TextInput } from "@shared/ui/Inputs";
import { renderWithProviders } from "@test-utils/renderer";

vi.unmock("@shared/ui/Inputs");

describe("TextInput", () => {
  it("renders TextInput with default props", () => {
    const { getByTestId } = renderWithProviders(
      <TextInput
        label="Test Input"
        value=""
        onChange={vi.fn()}
        placeholder="Enter text"
      />
    );

    fireEvent.change(getByTestId("textinput-Test Input"), {
      target: { value: "Test Value" },
    });
  });
});

describe("TextArea", () => {
  it("renders TextArea with default props", () => {
    const { getByTestId } = renderWithProviders(
      <TextArea
        label="Test Area"
        value=""
        onChange={vi.fn()}
        placeholder="Enter text"
      />
    );

    fireEvent.change(getByTestId("textarea-Test Area"), {
      target: { value: "Test Value" },
    });
  });
});
