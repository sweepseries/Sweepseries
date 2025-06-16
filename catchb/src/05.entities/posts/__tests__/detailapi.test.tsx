import { Text, View } from "react-native";
import axios from "axios";

import { samplePostDetail, usePostDetail } from "@entities/posts";
import { renderWithProviders } from "@test-utils/renderer";

const MockDetailComponent = ({ profileId }: { profileId?: string }) => {
  const { data, isSuccess } = usePostDetail(1, profileId);

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

describe("Posts Detail API", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  it("should fetch post detail", async () => {
    jest.spyOn(axios, "get").mockResolvedValueOnce({
      data: samplePostDetail,
    });

    const { findByText } = renderWithProviders(<MockDetailComponent />);
    expect(await findByText(JSON.stringify(samplePostDetail))).toBeTruthy();
  });

  it("should fetch post detail with profile id", async () => {
    jest.spyOn(axios, "get").mockResolvedValueOnce({
      data: samplePostDetail,
    });

    const { findByText } = renderWithProviders(
      <MockDetailComponent profileId="1" />
    );
    expect(await findByText(JSON.stringify(samplePostDetail))).toBeTruthy();
  });
});
