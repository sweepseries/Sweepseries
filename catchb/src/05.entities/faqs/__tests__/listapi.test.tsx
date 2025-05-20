import { Text, View } from "react-native";
import axios from "axios";

import { sampleFAQResponse, useFAQs } from "@entities/faqs";
import { renderWithProviders } from "@test-utils/renderer";

const MockListComponent = () => {
  const { data, isSuccess } = useFAQs();

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

describe("FAQs List API", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  it("should fetch FAQs list", async () => {
    jest.spyOn(axios, "get").mockResolvedValueOnce({
      data: sampleFAQResponse,
    });

    const { findByText } = renderWithProviders(<MockListComponent />);

    expect(await findByText(JSON.stringify(sampleFAQResponse))).toBeTruthy();
  });
});
