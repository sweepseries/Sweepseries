import { Text, View } from "react-native";
import axios from "axios";

import { sampleInquiries, useInquiries } from "@entities/inquiries";
import { renderWithProviders } from "@test-utils/renderer";

const MockListComponent = () => {
  const { data, isSuccess } = useInquiries();

  return (
    <View>
      {isSuccess && data ? (
        <Text>{JSON.stringify(data)}</Text>
      ) : (
        <View>Loading...</View>
      )}
    </View>
  );
};

describe("Inquiries List API", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  it("should fetch inquiries list", async () => {
    jest.spyOn(axios, "get").mockResolvedValueOnce({
      data: sampleInquiries,
    });

    const { findByText } = renderWithProviders(<MockListComponent />);

    expect(await findByText(JSON.stringify(sampleInquiries))).toBeTruthy();
  });
});
