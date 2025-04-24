import { fireEvent } from "@testing-library/react-native";

import { Selector } from "./Selector";
import { renderWithProviders } from "@utils/test-utils";

describe("<Selector />", () => {
  const options = ["Option 1", "Option 2", "Option 3"];
  const selected = "Option 2";

  it("renders correctly with given props", () => {
    const { getByTestId } = renderWithProviders(
      <Selector options={options} selected={selected} onSelect={jest.fn()} />
    );

    fireEvent.press(getByTestId("Option 1"));
  });
});
