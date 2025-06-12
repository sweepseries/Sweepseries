import { Text, View } from "react-native";
import axios from "axios";
import { fireEvent, waitFor } from "@testing-library/react-native";

import { sampleInquiries, useCreateInquiry } from "@entities/inquiries";
import { renderWithProviders } from "@test-utils/renderer";

const MockCreateComponent = () => {
  const { mutate, isSuccess } = useCreateInquiry();

  const handleCreate = () => {
    mutate({
      title: "New Inquiry",
      category: 0,
      content: "This is a test inquiry.",
      user: "user-uuid",
    });
  };

  return (
    <View>
      <Text onPress={handleCreate}>Create Inquiry</Text>
      {isSuccess && <Text>Inquiry Created</Text>}
    </View>
  );
};

describe("Inquiries Create API", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  it("should create an inquiry", async () => {
    const mockResponse = {
      data: sampleInquiries[0],
    };

    jest.spyOn(axios, "post").mockResolvedValueOnce(mockResponse);

    const { getByText } = renderWithProviders(<MockCreateComponent />);

    fireEvent.press(getByText("Create Inquiry"));

    await waitFor(() => {
      expect(getByText("Inquiry Created")).toBeTruthy();
    });
  });
});
