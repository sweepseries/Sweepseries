import { fireEvent } from "@testing-library/react-native";
import * as Router from "expo-router";

import {
  AnnouncementSimple,
  sampleAnnouncements,
} from "@entities/announcements";
import { renderWithProviders } from "@test-utils/renderer";

describe("AnnouncementSimple", () => {
  it("should render correctly", () => {
    const { getByTestId } = renderWithProviders(
      <AnnouncementSimple announcement={sampleAnnouncements[0]} />
    );

    fireEvent.press(getByTestId("announcement-1"));
    expect(Router.router.push).toHaveBeenCalledWith(`/mypage/announcements/1`);
  });
});
