import { fireEvent } from "@testing-library/react-native";

import { AnnouncementsLayout } from "../AnnouncementsLayout";
import { renderWithProviders } from "@test-utils/renderer";

describe("AnnouncementsLayout", () => {
  it("renders correctly", () => {
    const { getByTestId } = renderWithProviders(<AnnouncementsLayout />);

    // test back button
    fireEvent.press(getByTestId("header-back-button"));
  });
});
