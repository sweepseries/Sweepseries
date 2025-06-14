import { Text, View } from "react-native";
import axios from "axios";

import { samplePostListResponse, usePosts } from "@entities/posts";
import { renderWithProviders } from "@test-utils/renderer";

const MockListComponent = ({
  withParams = false,
}: {
  withParams?: boolean;
}) => {
  const query = withParams ? "search-query" : undefined;
  const tag = withParams ? "tag-name" : undefined;
  const { data, isSuccess } = usePosts("test-forum", query, tag);

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

describe("Posts List API", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  it("should fetch posts list with no params", async () => {
    jest.spyOn(axios, "get").mockResolvedValueOnce({
      data: samplePostListResponse,
    });

    const { findByText } = renderWithProviders(<MockListComponent />);

    expect(
      await findByText(JSON.stringify(samplePostListResponse))
    ).toBeTruthy();
  });

  it("should fetch posts list with params", async () => {
    jest.spyOn(axios, "get").mockResolvedValueOnce({
      data: samplePostListResponse,
    });

    const { findByText } = renderWithProviders(
      <MockListComponent withParams />
    );

    expect(
      await findByText(JSON.stringify(samplePostListResponse))
    ).toBeTruthy();
  });
});
