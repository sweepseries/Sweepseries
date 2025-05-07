import { Text, View } from "react-native";
import axios from "axios";

import { sampleTerms, useTerms } from "@entities/terms";
import { renderWithProviders } from "@test-utils/renderer";

const MockListComponent = () => {
  const { data, isSuccess } = useTerms();

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

describe("Terms List API", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  it("should fetch terms list", async () => {
    jest.spyOn(axios, "get").mockResolvedValueOnce({
      data: sampleTerms,
    });

    const { findByText } = renderWithProviders(<MockListComponent />);

    expect(await findByText(JSON.stringify(sampleTerms))).toBeTruthy();
  });
});
