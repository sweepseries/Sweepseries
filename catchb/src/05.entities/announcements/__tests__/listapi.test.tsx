import { Text, View } from "react-native";
import axios from "axios";

import { sampleAnnouncements, useAnnouncements } from "@entities/announcements";
import { renderWithProviders } from "@test-utils/renderer";

const MockListComponent = () => {
  const { data, isSuccess } = useAnnouncements();

  return (
    <View>
      {isSuccess && data ? (
        <Text>{JSON.stringify(data)}</Text>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
};

describe("Announcements List API", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  it("should fetch announcements list", async () => {
    jest.spyOn(axios, "get").mockResolvedValueOnce({
      data: sampleAnnouncements,
    });

    const { findByText } = renderWithProviders(<MockListComponent />);

    expect(await findByText(JSON.stringify(sampleAnnouncements))).toBeTruthy();
  });
});
