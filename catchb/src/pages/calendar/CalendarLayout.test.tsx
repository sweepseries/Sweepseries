import { fireEvent } from "@testing-library/react-native";

import { CalendarLayout } from "./CalendarLayout";
import { renderWithProviders } from "@utils/test-utils";

describe("<CalendarLayout />", () => {
  it("renders correctly", () => {
    const { getByTestId } = renderWithProviders(<CalendarLayout />);

    fireEvent.press(getByTestId("back-button"));
  });
});
