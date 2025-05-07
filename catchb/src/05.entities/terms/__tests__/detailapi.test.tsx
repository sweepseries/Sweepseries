import { Text, View } from "react-native";
import axios from "axios";

import { sampleTerms, useTermsDetail } from "@entities/terms";
import { renderWithProviders } from "@test-utils/renderer";

const MockDetailComponent = ({ id }: { id: string }) => {
  const { data, isSuccess } = useTermsDetail(id);

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

describe("Terms Detail API", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  it("should fetch terms detail", async () => {
    jest.spyOn(axios, "get").mockResolvedValueOnce({
      data: sampleTerms[0],
    });

    const { findByText } = renderWithProviders(<MockDetailComponent id="1" />);
    expect(await findByText(JSON.stringify(sampleTerms[0]))).toBeTruthy();
  });
});
